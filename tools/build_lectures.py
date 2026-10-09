"""Tạo lại audio bài giảng Lịch sử từ data/lectures.js.

Cách dùng (cần Python 3.9+, Node.js và mạng):
    pip install edge-tts
    python tools/build_lectures.py                    # giọng nữ (nghe bài giảng), tất cả thời kỳ
    python tools/build_lectures.py --nam              # giọng nam (dùng cho chế độ video)
    python tools/build_lectures.py --nam 1930-1935    # chỉ một/vài thời kỳ

Kết quả:
    giọng nữ: assets/audio/lich-su-<thời kỳ>.mp3      + data/lecture-timing.js      (window.LECTURE_TIMING)
    giọng nam: assets/audio/lich-su-<thời kỳ>-nam.mp3 + data/lecture-timing-nam.js  (window.LECTURE_TIMING_NAM)
Dịch vụ giọng đọc đôi khi từ chối yêu cầu; script tự thử lại và lưu tạm từng đoạn trong tools/.tts-cache,
mốc thời gian từng thời kỳ trong tools/.timing — có thể chạy lại hoặc chạy song song nhiều lệnh.
"""
import asyncio, glob, hashlib, json, os, subprocess, sys
import edge_tts

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE = os.path.join(ROOT, 'tools', '.tts-cache')
BYTES_PER_SEC = 6000  # mp3 48 kbit/s mono
VOICES = {
    'nu':  {'voice': 'vi-VN-HoaiMyNeural',  'rate': '+10%', 'suffix': '',     'js': 'lecture-timing.js',     'var': 'LECTURE_TIMING'},
    'nam': {'voice': 'vi-VN-NamMinhNeural', 'rate': '+8%',  'suffix': '-nam', 'js': 'lecture-timing-nam.js', 'var': 'LECTURE_TIMING_NAM'},
}

def load_lectures():
    js = "global.window={};require(process.argv[1]);process.stdout.write(JSON.stringify(window.LECTURES))"
    out = subprocess.run(['node', '-e', js, os.path.join(ROOT, 'data', 'lectures.js')],
                         capture_output=True, text=True, encoding='utf8', check=True).stdout
    return json.loads(out)

async def synth(text, cfg):
    key = hashlib.md5((cfg['voice'] + cfg['rate'] + text).encode()).hexdigest()
    mp3, cue = os.path.join(CACHE, key + '.mp3'), os.path.join(CACHE, key + '.json')
    if os.path.exists(mp3) and os.path.getsize(mp3) > 0:
        return open(mp3, 'rb').read(), json.load(open(cue, encoding='utf8'))
    for attempt in range(16):
        try:
            audio, sentences = b'', []
            async for ch in edge_tts.Communicate(text, cfg['voice'], rate=cfg['rate']).stream():
                if ch['type'] == 'audio':
                    audio += ch['data']
                elif ch['type'] in ('SentenceBoundary', 'WordBoundary'):
                    sentences.append([ch['offset'] / 1e7, (ch['offset'] + ch['duration']) / 1e7, ch['text']])
            if audio:
                json.dump(sentences, open(cue, 'w', encoding='utf8'), ensure_ascii=False)
                open(mp3, 'wb').write(audio)
                return audio, sentences
        except Exception:
            pass
        await asyncio.sleep(1.2 + attempt * 0.4)
    raise RuntimeError('Không tạo được giọng đọc cho đoạn: ' + text[:60])

async def build(pid, lec, cfg, tdir):
    audio, t, cues, chapters = b'', 0.0, [], []
    for ci, ch in enumerate(lec['chapters']):
        chapters.append({'title': ch['title'], 'target': ch['target'], 'start': round(t, 2)})
        parts = ([ch['title'] + '.'] if ci > 0 else []) + ch['paras']
        for para in parts:
            data, sentences = await synth(para, cfg)
            for a, b, txt in sentences:
                cues.append({'s': round(t + a, 2), 'e': round(t + b, 2), 'c': ci, 't': txt})
            if not sentences:
                cues.append({'s': round(t, 2), 'e': round(t + len(data) / BYTES_PER_SEC, 2), 'c': ci, 't': para})
            audio += data
            t += len(data) / BYTES_PER_SEC
    open(os.path.join(ROOT, 'assets', 'audio', f'lich-su-{pid}{cfg["suffix"]}.mp3'), 'wb').write(audio)
    json.dump({'duration': round(t, 1), 'chapters': chapters, 'cues': cues},
              open(os.path.join(tdir, pid + '.json'), 'w', encoding='utf8'), ensure_ascii=False)
    print(pid, cfg['voice'], 'xong', round(t / 60, 1), 'phút', flush=True)

def write_timing(cfg, tdir):
    timing = {}
    for f in sorted(glob.glob(os.path.join(tdir, '*.json'))):
        pid = os.path.splitext(os.path.basename(f))[0]
        if os.path.exists(os.path.join(ROOT, 'assets', 'audio', f'lich-su-{pid}{cfg["suffix"]}.mp3')):
            timing[pid] = json.load(open(f, encoding='utf8'))
    with open(os.path.join(ROOT, 'data', cfg['js']), 'w', encoding='utf8') as fh:
        fh.write(f'// Mốc chương + phụ đề theo câu cho assets/audio/lich-su-<thời kỳ>{cfg["suffix"]}.mp3 (tạo bằng tools/build_lectures.py).\n')
        fh.write(f'window.{cfg["var"]} = ' + json.dumps(timing, ensure_ascii=False, separators=(',', ':')) + ';\n')

async def main(args):
    key = 'nam' if '--nam' in args else 'nu'
    only = [a for a in args if not a.startswith('--')]
    cfg = VOICES[key]
    tdir = os.path.join(ROOT, 'tools', '.timing', key)
    for d in (CACHE, tdir, os.path.join(ROOT, 'assets', 'audio')):
        os.makedirs(d, exist_ok=True)
    for pid, lec in load_lectures().items():
        if only and pid not in only:
            continue
        try:
            await build(pid, lec, cfg, tdir)
        except Exception as e:
            print(pid, 'LỖI', e, flush=True)
        write_timing(cfg, tdir)
    write_timing(cfg, tdir)

if __name__ == '__main__':
    asyncio.run(main(sys.argv[1:]))
