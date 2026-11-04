"""python3 -m unittest discover -s integration/InputProtocol/receiver"""
import json
import pathlib
import unittest

import vrbq_receiver as r

FIXTURES = pathlib.Path(__file__).resolve().parent.parent / "fixtures"


class ReceiverTest(unittest.TestCase):
    def test_binary_and_json_fixtures_decode_to_the_same_state(self):
        binary = r.decode((FIXTURES / "sample-v2.bin").read_bytes())
        text = r.decode((FIXTURES / "sample-v2.json").read_bytes())
        self.assertEqual(json.loads(json.dumps(binary)), text)
        self.assertTrue(binary["left"]["up"] and binary["left"]["minus"])
        self.assertTrue(binary["right"]["b"] and binary["right"]["click"])
        self.assertIn("DEMO", r.describe(dict(binary, demo=True)))

    def test_rejects_foreign_packets(self):
        for bad in (b"hello", b"{\"proto\":\"x\"}", b"XXXX" + bytes(56)):
            with self.assertRaises(ValueError):
                r.decode(bad)


if __name__ == "__main__":
    unittest.main()
