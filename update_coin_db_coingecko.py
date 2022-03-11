import requests
import json
import sqlite3
import os



def fetch_coins_coingecko():
    response = requests.get(
        "https://api.coingecko.com/api/v3/search?locale=en",
        headers={
            "Content-Type":'application/json', 
            "User-Agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.80 Safari/537.36"
            }
    )
    return response

def get_coins_string():
    response = fetch_coins_coingecko()
    return response.text


def store_single_json(coins):
    try:
        conn = sqlite3.connect(os.path.dirname(__file__) + "/db.sqlite3")
        c = conn.cursor()
        # query = """
        #     INSERT INTO cryptotracker_allcoinsexternal (coins)
        #     VALUES (?)
        # """
        query = """
            UPDATE 
                cryptotracker_allcoinsexternal
            SET
                coins = ?
            WHERE
                id = 1
        """
        c.execute(
            query, 
            (coins,) # second param needs to be a tuple if passing in 2 arguments into execute
        )        
        conn.commit()
    except Exception as err:
        print("Error:")
        print(err)
    finally:
        if conn:
            conn.close()
    

print("Getting coins from coingecko")
coins = get_coins_string()
print("Gathered coins, now storing to db...")
store_single_json(coins)

input("Database updated, press any key to close")