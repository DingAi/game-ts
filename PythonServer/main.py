import csv
import io
import random
import string
import time
from fastapi import FastAPI, Response, WebSocket
import numpy as np
import uvicorn

app = FastAPI()

def generate_random_content(size):
    return ''.join(random.choices(string.ascii_uppercase + string.ascii_lowercase + string.digits, k=size))



@app.get("/str")
def read_root():
    return {'str':"春眠不觉晓"}

def generate_3d_data():
    # Generate random 3D data
    data = np.random.randint(0, 100, size=(100, 100, 100, 4))
    return data.tolist()

def generate_random_string(length):
    letters = string.ascii_letters + string.digits
    return ''.join(random.choice(letters) for _ in range(length))


def generate_random_string(length):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

@app.get("/generate_file")
async def generate_file():
    random_data = generate_random_string(8 * 1024 * 1024)  # 生成10MB大小的随机数据
    return Response(content=random_data, media_type="application/octet-stream")

# WebSocket route
@app.websocket("/fws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()

    data = generate_random_string(25)

    try:
        while True:
            await websocket.send_json(generate_random_string(25))
            print('发送数据')
            time.sleep(2)
    except Exception as e:
        print(e)
        await websocket.close()


# 生成随机的 CSV 数据
def generate_csv_data(rows=1000):
    data = io.StringIO()
    writer = csv.writer(data)

    # 写入 CSV 头部
    writer.writerow(['ID', 'Name', 'Age'])

    # 写入随机数据
    for i in range(rows):
        writer.writerow([i, f"Name {i}", random.randint(18, 60)])

    # 将指针移到文件开头
    data.seek(0)
    return data

# 提供下载 CSV 文件的路由
@app.get("/download")
def download_csv():
    csv_data = generate_csv_data(rows=1000)  # 生成1000行的随机数据
    return Response(content=csv_data, media_type="text/csv", headers={"Content-Disposition": "attachment; filename=random_data.csv"})


# if __name__ == '__main__':
#     uvicorn.run(app='main:app', host='0.0.0.0', port=2334, reload=False)