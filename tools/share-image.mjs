import assert from 'node:assert/strict';

/** Read the baseline/progressive JPEG frame rather than trusting its filename. */
export function assertShareImage(bytes) {
  assert.equal(bytes.readUInt16BE(0), 0xffd8, 'Share image must be a JPEG');
  for (let offset = 2; offset + 8 < bytes.length;) {
    assert.equal(bytes[offset], 0xff, 'Invalid JPEG marker');
    const marker = bytes[offset + 1];
    if (marker === 0xc0 || marker === 0xc2) {
      assert.equal(bytes.readUInt16BE(offset + 5), 630, 'Share image height');
      assert.equal(bytes.readUInt16BE(offset + 7), 1200, 'Share image width');
      return;
    }
    offset += 2 + bytes.readUInt16BE(offset + 2);
  }
  assert.fail('Missing JPEG frame');
}
