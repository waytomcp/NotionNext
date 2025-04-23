import json

DATE_TYPES = ["datetime", "date", "timestamp"];
def main(arg1, arg2):
  if (arg1 is None):
    clean_response = arg2;
  else:
    # 去掉可能的 Markdown 代码块
    clean_response = arg1.replace("```json", "").replace("```", "").strip()
  
  data = json.loads(clean_response)
  arg2_data = json.loads(arg2)

  for item in data:
        table_name = item["tn"]
        # 查找匹配的表结构信息
        for table in arg2_data:
            if table["d"] == table_name:
                for field in table["g"]:
                    if ("if" in item):
                      if (field["h"] == item["if"]) & (item["if"] is not None):
                          if field["j"] in DATE_TYPES:
                              item["im"] = "${etl_date}"
                          else:
                              item["im"] = "${max_id}"
                          break
                break

  print(data)
  return {
    "result": json.dumps(data, indent=4, ensure_ascii=False),
        # ... existing code ...
  }