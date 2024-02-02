import matplotlib.pyplot as plt
import pandas as pd
import json
import sys

def generate_sales_chart(start_date, end_date):
    try:
        with open('./file.json', 'r') as f:
            sales_data = f.read()

        sales_data = json.loads(sales_data)

        df = pd.DataFrame(sales_data)
 
        df['date'] = pd.to_datetime(df['date'])

        df = df[(df['date'] >= start_date) & (df['date'] <= end_date)]

        monthly_sales = df.groupby(df['date'].dt.to_period("M")).sum()

        plt.bar(monthly_sales.index.astype(str), monthly_sales['sales'])
        plt.xlabel('Month')
        plt.ylabel('Sales')
        plt.title('Monthly Sales Chart')
        chart_file_path = 'monthly_sales_chart.png'
        plt.savefig(chart_file_path)
        plt.close()

        print(json.dumps({'chartFilePath': chart_file_path}))

    except Exception as e:
        print(json.dumps({'error': str(e)}))

generate_sales_chart('19-01-2019', '20-01-2019')
