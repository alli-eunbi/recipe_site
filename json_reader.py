import json
import argparse

parser = argparse.ArgumentParser(description='Read json file encoded with utf-8')
parser.add_argument('-r', '--read', metavar='', type=str, default='./result/predicted_result.json', help='Json path to read')

args = parser.parse_args()

# file_path = './result/predicted_result.json'

with open(args.read, 'r', encoding='utf-8') as f:
    json_contents = f.read()
    json_data = json.loads(json_contents)
    print(json_data)