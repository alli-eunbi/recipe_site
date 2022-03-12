import json
import argparse

# file_path = './result/predicted_result.json'

with open('/result/predicted_result.json', 'r', encoding='utf-8') as f:
    json_contents = f.read()
    json_data = json.loads(json_contents)
    print(json_data)