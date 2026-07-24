import urllib.request, json
d = json.loads(urllib.request.urlopen("https://open.er-api.com/v6/latest/USD", timeout=10).read())
krw = d["rates"]["KRW"]
print(f"USD/KRW: {krw}")
