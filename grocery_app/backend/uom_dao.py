def get_uoms(connection):
    cursor = connection.cursor()
    query = ("SELECT * FROM uom")
    cursor.execute(query)

    response = []

    for (uom_id, uom_name) in cursor:
        response.append({
            'uom_id': uom_id,
            'uom_name': uom_name
        })

    cursor.close()
    return response

def insert_uom(connection, uom):
    cursor = connection.cursor()

    query = "INSERT INTO uom (uom_name) VALUES (%s)"

    data = (uom['uom_name'],)

    cursor.execute(query, data)
    connection.commit()

    return cursor.lastrowid

if __name__ == "__main__":
    from sql_connection import get_sql_connection

    connection = get_sql_connection()
    print(get_uoms(connection))
    connection.close()