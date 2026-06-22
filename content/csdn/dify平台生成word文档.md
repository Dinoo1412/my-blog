---
title: "Dify平台生成word文档"
date: "2026-05-11"
tags: []
csdnUrl: "https://blog.csdn.net/weixin_63110324/article/details/147381310"
source: csdn
---
1.安装python环境flask库及request库

2.编写代码

```python
from flask import Flask, request, send_file, Response
from docx import Document
from docx.shared import Pt
from docx.oxml.ns import qn
import os
import json

app = Flask(__name__)

base_dir = os.path.dirname(os.path.abspath(__file__))
upload_dir = os.path.join(base_dir, "upload")
template_dir = os.path.join(upload_dir, "template")
output_dir = os.path.join(upload_dir, "output")
os.makedirs(template_dir, exist_ok=True)
os.makedirs(output_dir, exist_ok=True)

def split_text(text):
    sep1 = "一、会议议案如下："
    sep2 = "二、会议确定事项如下："
    idx1 = text.find(sep1)
    idx2 = text.find(sep2)
    if idx1 == -1 or idx2 == -1 or idx1 >= idx2:
        raise ValueError("文本格式不符合要求，缺少必要分隔符")
    a = text[:idx1].strip()
    b = text[idx1 + len(sep1):idx2].strip()
    c = text[idx2 + len(sep2):].strip()
    return a, b, c

def modify_document(template_path, output_path, replacements):
    try:
        doc = Document(template_path)
        for paragraph in doc.paragraphs:
            for run in paragraph.runs:
                for key, value in replacements.items():
                    if key in run.text:
                        run.text = run.text.replace(key, value)
                        run.font.name = '仿宋'
                        run._element.rPr.rFonts.set(qn('w:eastAsia'), '仿宋')
                        run.font.size = Pt(16)
                        paragraph.paragraph_format.line_spacing = Pt(29)
        doc.save(output_path)
        return True
    except Exception as e:
        print(f"处理文档时出错: {e}")
        return False

def generate_document(template_name, text, name):
    safe_name = name.strip().replace(" ", "_")
    template_path = os.path.join(template_dir, template_name)
    output_path = os.path.join(output_dir, f"纪要-{safe_name}.docx")
    replacements = {'{text}': text}
    server_url = request.host_url.rstrip('/')
    download_url = f"{server_url}/download/纪要-{safe_name}.docx"
    markdown_link = f"[file.docx]({download_url})"
    print("✅ 正在写入文件到：", output_path)
    if modify_document(template_path, output_path, replacements):
        return Response(json.dumps({"link": markdown_link}, ensure_ascii=False), content_type="application/json"), 200
    else:
        return Response(json.dumps({"error": "生成文档失败"}, ensure_ascii=False), content_type="application/json"), 500

def generate_zjlbg(template_name, text, name):
    safe_name = name.strip().replace(" ", "_")
    template_path = os.path.join(template_dir, template_name)
    output_path = os.path.join(output_dir, f"纪要-{safe_name}.docx")
    try:
        a, b, c = split_text(text)
    except ValueError as e:
        return Response(json.dumps({"error": str(e)}, ensure_ascii=False), content_type="application/json"), 400
    replacements = {
        '{section_a}': a,
        '{section_b}': b,
        '{section_c}': c
    }
    server_url = request.host_url.rstrip('/')
    download_url = f"{server_url}/download/纪要-{safe_name}.docx"
    markdown_link = f"[file.docx]({download_url})"
    print("✅ 正在写入文件到：", output_path)
    if modify_document(template_path, output_path, replacements):
        return Response(json.dumps({"link": markdown_link}, ensure_ascii=False), content_type="application/json"), 200
    else:
        return Response(json.dumps({"error": "生成文档失败"}, ensure_ascii=False), content_type="application/json"), 500

@app.route('/dw', methods=['POST'])
def dw():
    data = request.json
    text = data.get('text')
    name = data.get('name')
    if not text:
        return Response(json.dumps({"error": "No text provided"}, ensure_ascii=False), content_type="application/json"), 400
    return generate_document("党委.docx", text, name)

@app.route('/dsh', methods=['POST'])
def dsh():
    data = request.json
    text = data.get('text')
    name = data.get('name')
    if not text:
        return Response(json.dumps({"error": "No text provided"}, ensure_ascii=False), content_type="application/json"), 400
    return generate_document("董事会.docx", text, name)

@app.route('/qzyj', methods=['POST'])
def qzyj():
    data = request.json
    text = data.get('text')
    name = data.get('name')
    if not text:
        return Response(json.dumps({"error": "No text provided"}, ensure_ascii=False), content_type="application/json"), 400
    return generate_document("前置研究.docx", text, name)

@app.route('/zjlbg', methods=['POST'])
def zjlbg():
    data = request.json
    text = data.get('text')
    name = data.get('name')
    if not text:
        return Response(json.dumps({"error": "No text provided"}, ensure_ascii=False), content_type="application/json"), 400
    return generate_zjlbg("总经理办公.docx", text, name)

@app.route('/zjlbg-ys', methods=['POST'])
def zjlbg_ys():
    data = request.json
    text = data.get('text')
    name = data.get('name')
    if not text:
        return Response(json.dumps({"error": "No text provided"}, ensure_ascii=False), content_type="application/json"), 400
    return generate_zjlbg("总经理办公-演示.docx", text, name)

@app.route('/download/', methods=['GET'])
def download_file(filename):
    file_path = os.path.join(output_dir, filename)
    print(f"请求下载：{filename}")
    if os.path.exists(file_path):
        return send_file(file_path, as_attachment=True)
    else:
        return Response(json.dumps({"error": "File not found"}, ensure_ascii=False), content_type="application/json"), 404

if __name__ == '__main__':
    app.run(host='IP地址', port=端口, debug=True)

```

3.本地测试

```python
import requests
import json
url = ("IP地址//dw")  # 你要换成对应的接口路径，比如 /dw, /dsh 等等

payload = {
    "text": """公司名称：XXX公司
一、会议议案如下：
1. 审议通过2025年度预算
2. 讨论新项目立项

二、会议确定事项如下：
1. 批准采购服务器预算
""",
    "name": "测试纪要"
}

headers = {
    "Content-Type": "application/json"
}

response = requests.post(url, data=json.dumps(payload), headers=headers)

print("状态码：", response.status_code)
print("响应：", response.text)

```

如果可以返回url下载链接即代表下载成功

如：状态码200即代表创建成功。

![image](https://i-blog.csdnimg.cn/img_convert/711ec5493f51abca34f527d4f39385de.png)

然后在Dify平台搭建工作流

![image](https://i-blog.csdnimg.cn/direct/8befc900f4374b6f8cf0f8a30392f0f1.png)

特别是利用好HTTP节点

                
        
                    1.安装python环境flask库及request库

2.编写代码

```python
from flask import Flask, request, send_file, Response
from docx import Document
from docx.shared import Pt
from docx.oxml.ns import qn
import os
import json

app = Flask(__name__)

base_dir = os.path.dirname(os.path.abspath(__file__))
upload_dir = os.path.join(base_dir, "upload")
template_dir = os.path.join(upload_dir, "template")
output_dir = os.path.join(upload_dir, "output")
os.makedirs(template_dir, exist_ok=True)
os.makedirs(output_dir, exist_ok=True)

def split_text(text):
    sep1 = "一、会议议案如下："
    sep2 = "二、会议确定事项如下："
    idx1 = text.find(sep1)
    idx2 = text.find(sep2)
    if idx1 == -1 or idx2 == -1 or idx1 >= idx2:
        raise ValueError("文本格式不符合要求，缺少必要分隔符")
    a = text[:idx1].strip()
    b = text[idx1 + len(sep1):idx2].strip()
    c = text[idx2 + len(sep2):].strip()
    return a, b, c

def modify_document(template_path, output_path, replacements):
    try:
        doc = Document(template_path)
        for paragraph in doc.paragraphs:
            for run in paragraph.runs:
                for key, value in replacements.items():
                    if key in run.text:
                        run.text = run.text.replace(key, value)
                        run.font.name = '仿宋'
                        run._element.rPr.rFonts.set(qn('w:eastAsia'), '仿宋')
                        run.font.size = Pt(16)
                        paragraph.paragraph_format.line_spacing = Pt(29)
        doc.save(output_path)
        return True
    except Exception as e:
        print(f"处理文档时出错: {e}")
        return False

def generate_document(template_name, text, name):
    safe_name = name.strip().replace(" ", "_")
    template_path = os.path.join(template_dir, template_name)
    output_path = os.path.join(output_dir, f"纪要-{safe_name}.docx")
    replacements = {'{text}': text}
    server_url = request.host_url.rstrip('/')
    download_url = f"{server_url}/download/纪要-{safe_name}.docx"
    markdown_link = f"[file.docx]({download_url})"
    print("✅ 正在写入文件到：", output_path)
    if modify_document(template_path, output_path, replacements):
        return Response(json.dumps({"link": markdown_link}, ensure_ascii=False), content_type="application/json"), 200
    else:
        return Response(json.dumps({"error": "生成文档失败"}, ensure_ascii=False), content_type="application/json"), 500

def generate_zjlbg(template_name, text, name):
    safe_name = name.strip().replace(" ", "_")
    template_path = os.path.join(template_dir, template_name)
    output_path = os.path.join(output_dir, f"纪要-{safe_name}.docx")
    try:
        a, b, c = split_text(text)
    except ValueError as e:
        return Response(json.dumps({"error": str(e)}, ensure_ascii=False), content_type="application/json"), 400
    replacements = {
        '{section_a}': a,
        '{section_b}': b,
        '{section_c}': c
    }
    server_url = request.host_url.rstrip('/')
    download_url = f"{server_url}/download/纪要-{safe_name}.docx"
    markdown_link = f"[file.docx]({download_url})"
    print("✅ 正在写入文件到：", output_path)
    if modify_document(template_path, output_path, replacements):
        return Response(json.dumps({"link": markdown_link}, ensure_ascii=False), content_type="application/json"), 200
    else:
        return Response(json.dumps({"error": "生成文档失败"}, ensure_ascii=False), content_type="application/json"), 500

@app.route('/dw', methods=['POST'])
def dw():
    data = request.json
    text = data.get('text')
    name = data.get('name')
    if not text:
        return Response(json.dumps({"error": "No text provided"}, ensure_ascii=False), content_type="application/json"), 400
    return generate_document("党委.docx", text, name)

@app.route('/dsh', methods=['POST'])
def dsh():
    data = request.json
    text = data.get('text')
    name = data.get('name')
    if not text:
        return Response(json.dumps({"error": "No text provided"}, ensure_ascii=False), content_type="application/json"), 400
    return generate_document("董事会.docx", text, name)

@app.route('/qzyj', methods=['POST'])
def qzyj():
    data = request.json
    text = data.get('text')
    name = data.get('name')
    if not text:
        return Response(json.dumps({"error": "No text provided"}, ensure_ascii=False), content_type="application/json"), 400
    return generate_document("前置研究.docx", text, name)

@app.route('/zjlbg', methods=['POST'])
def zjlbg():
    data = request.json
    text = data.get('text')
    name = data.get('name')
    if not text:
        return Response(json.dumps({"error": "No text provided"}, ensure_ascii=False), content_type="application/json"), 400
    return generate_zjlbg("总经理办公.docx", text, name)

@app.route('/zjlbg-ys', methods=['POST'])
def zjlbg_ys():
    data = request.json
    text = data.get('text')
    name = data.get('name')
    if not text:
        return Response(json.dumps({"error": "No text provided"}, ensure_ascii=False), content_type="application/json"), 400
    return generate_zjlbg("总经理办公-演示.docx", text, name)

@app.route('/download/', methods=['GET'])
def download_file(filename):
    file_path = os.path.join(output_dir, filename)
    print(f"请求下载：{filename}")
    if os.path.exists(file_path):
        return send_file(file_path, as_attachment=True)
    else:
        return Response(json.dumps({"error": "File not found"}, ensure_ascii=False), content_type="application/json"), 404

if __name__ == '__main__':
    app.run(host='IP地址', port=端口, debug=True)

```

3.本地测试

```python
import requests
import json
url = ("IP地址//dw")  # 你要换成对应的接口路径，比如 /dw, /dsh 等等

payload = {
    "text": """公司名称：XXX公司
一、会议议案如下：
1. 审议通过2025年度预算
2. 讨论新项目立项

二、会议确定事项如下：
1. 批准采购服务器预算
""",
    "name": "测试纪要"
}

headers = {
    "Content-Type": "application/json"
}

response = requests.post(url, data=json.dumps(payload), headers=headers)

print("状态码：", response.status_code)
print("响应：", response.text)

```

如果可以返回url下载链接即代表下载成功

如：状态码200即代表创建成功。

![image](https://i-blog.csdnimg.cn/img_convert/711ec5493f51abca34f527d4f39385de.png)

然后在Dify平台搭建工作流

![image](https://i-blog.csdnimg.cn/direct/8befc900f4374b6f8cf0f8a30392f0f1.png)

特别是利用好HTTP节点