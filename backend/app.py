from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/process-command', methods=['POST'])
def process_command():
    try:
        # Nhận dữ liệu JSON từ yêu cầu
        data = request.get_json()

        # Chuyển tiếp yêu cầu đến endpoint ngoại vi
        external_endpoint = 'https://cli.gorilla-llm.com/commands'
        response = requests.post(external_endpoint, json=data)

        # Trả về phản hồi từ endpoint ngoại vi
        return response.text, response.status_code

    except Exception as e:
        # Xử lý lỗi
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
