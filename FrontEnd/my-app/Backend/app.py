
from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS
from datetime import datetime 
import requests

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return 'Bem-vindo à API!', 200

def init_db():
    conn = sqlite3.connect('meubanco.db')
    cursor = conn.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS Cadastro (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        sobrenome TEXT NOT NULL,
        cpf TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        telefone TEXT,
        cep TEXT,
        rua TEXT,
        N_ap TEXT,
        numero TEXT,
        bairro TEXT,
        cidade TEXT,
        estado TEXT,
        senha1 TEXT NOT NULL,
        tipo_usuario TEXT NOT NULL
    )
    """)
      
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS Armario (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        numero_armario INTEGER NOT NULL,
        status TEXT NOT NULL
    )
    """)

    cursor.execute('''
            CREATE TABLE IF NOT EXISTS Moradores (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                sobrenome TEXT NOT NULL,
                N_ap TEXT NOT NULL,
                telefone TEXT NOT NULL
            )
        ''')
    
    cursor.execute(''' 
            CREATE TABLE IF NOT EXISTS Entregador (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                sobrenome TEXT NOT NULL,
                N_ap TEXT NOT NULL,
                telefone TEXT NOT NULL
            )
        ''')
    cursor.execute('''
            CREATE TABLE IF NOT EXISTS Sindico(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                sobrenome TEXT NOT NULL,
                N_ap TEXT NOT NULL,
                telefone TEXT NOT NULL
            )
        ''')



  
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS Tabela_de_Entregas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        morador_id INTEGER,
        nome_completo TEXT,
        data_entrega DATETIME,
        data_retirada DATETIME,
        status TEXT,
        armario_id INTEGER,
        FOREIGN KEY (morador_id) REFERENCES Cadastro(id),
        FOREIGN KEY (armario_id) REFERENCES Armario(id)
    )
    """)
    conn.commit()
    conn.close()


init_db()

#aqui tem atualizações
@app.route('/cadastro', methods=['POST'])
def cadastrar():
    data = request.get_json()
    print("Dados recebidos:", data)  

    nome = data.get('nome')
    sobrenome = data.get('sobrenome')
    cpf = data.get('cpf')
    email = data.get('email')
    telefone = data.get('telefone')
    cep = data.get('cep')
    rua = data.get('rua')
    N_ap = data.get('N_ap')
    numero = data.get('numero')
    bairro = data.get('bairro')
    cidade = data.get('cidade')
    estado = data.get('estado')
    senha1 = data.get('senha1')
    senha2 = data.get('senha2')
    tipo_usuario = data.get('tipo_usuario')

    
    if not nome or not sobrenome or not email or not senha1 or not senha2:
        print("Erro: Campos obrigatórios ausentes.")
        return jsonify({'message': 'Por favor, preencha todos os campos obrigatórios.'}), 400

    if senha1 != senha2:
        print("Erro: As senhas não correspondem.")
        return jsonify({'message': 'As senhas digitadas não correspondem.'}), 400

    try:
        conn = sqlite3.connect('meubanco.db')
        cursor = conn.cursor()
        print("Tentando inserir dados no banco...")

        cursor.execute("""
            INSERT INTO Cadastro (nome, sobrenome, cpf, email, telefone, cep, rua, N_ap, numero, bairro, cidade, estado, senha1, tipo_usuario)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (nome, sobrenome, cpf, email, telefone, cep, rua, N_ap, numero, bairro, cidade, estado, senha1, tipo_usuario))
        conn.commit()

      #Adiciona o tipo de usuario (morador) na tabela Moradores
      
        if tipo_usuario == 'morador':
            cursor.execute("""
                INSERT INTO Moradores (nome, sobrenome,N_ap, telefone)
                VALUES (?, ?,?, ?)
            """, (nome, sobrenome, N_ap, telefone))
            conn.commit()

        #Adiciona o tipo de usuario (porteiro) na tabela Entregado

        if tipo_usuario == 'porteiro':
            cursor.execute("""
                INSERT INTO Entregador (nome, sobrenome,N_ap, telefone)
                VALUES (?, ?,?, ?)
            """, (nome, sobrenome, N_ap, telefone))
            conn.commit()



         #Adiciona o tipo de usuario (sindico) na tabela sindico

        if tipo_usuario == 'sindico':
            cursor.execute("""
                INSERT INTO sindico (nome, sobrenome,N_ap, telefone)
                VALUES (?, ?,?, ?)
            """, (nome, sobrenome, N_ap, telefone))
            conn.commit()


        print("Dados inseridos com sucesso.")
        return jsonify({'message': 'Dados cadastrados com sucesso.'}), 201
    except sqlite3.IntegrityError:
        print("Erro: E-mail já cadastrado.")
        return jsonify({'message': 'Este e-mail já está cadastrado.'}), 409
    except sqlite3.Error as e:
        print(f"Erro ao cadastrar dados: {e}")
        return jsonify({'error': f"Erro ao cadastrar dados: {e}"}), 500
    finally:
        if conn:
            conn.close()
            
            print("Conexão com o banco fechada.")

#buscando moradores

@app.route('/moradores', methods=['GET'])
def get_moradores():
    try:
        conn = sqlite3.connect('meubanco.db', timeout=10)
        cursor = conn.cursor()
        
        
        cursor.execute("SELECT id, nome, sobrenome, N_ap, telefone FROM Cadastro WHERE tipo_usuario = 'morador'")
        moradores = cursor.fetchall()
        
        resultado = [{'id': morador[0], 'nome': morador[1], 'sobrenome': morador[2], 'N_ap': morador[3], 'telefone': morador[4]} for morador in moradores]
        return jsonify(resultado), 200

    except sqlite3.Error as e:
        return jsonify({'error': f'Erro no banco de dados: {str(e)}'}), 500
    finally:
        if conn:
            conn.close()

#buscando porteiros

@app.route('/porteiros', methods=['GET'])
def get_porteiros():
    try:
        conn = sqlite3.connect('meubanco.db', timeout=10)
        cursor = conn.cursor()
        
        
        cursor.execute("SELECT id, nome, sobrenome, N_ap, telefone FROM Cadastro WHERE tipo_usuario = 'porteiro'")
        moradores = cursor.fetchall()
        
        resultado = [{'id': morador[0], 'nome': morador[1], 'sobrenome': morador[2], 'N_ap': morador[3], 'telefone': morador[4]} for morador in moradores]
        return jsonify(resultado), 200

    except sqlite3.Error as e:
        return jsonify({'error': f'Erro no banco de dados: {str(e)}'}), 500
    finally:
        if conn:
            conn.close()



#buscando sindicos
@app.route('/sindicos', methods=['GET'])
def get_sindicos():
    try:
        conn = sqlite3.connect('meubanco.db', timeout=10)
        cursor = conn.cursor()
        
       
        cursor.execute("SELECT id, nome, sobrenome, N_ap, telefone FROM Cadastro WHERE tipo_usuario = 'sindico'")
        sindicos = cursor.fetchall()
        
        resultado = [{'id': sindico[0], 'nome': sindico[1], 'sobrenome': sindico[2], 'N_ap': sindico[3], 'telefone': sindico[4]} for sindico in sindicos]
        return jsonify(resultado), 200

    except sqlite3.Error as e:
        return jsonify({'error': f'Erro no banco de dados: {str(e)}'}), 500
    finally:
        if conn:
            conn.close()

            
@app.route('/perfil/<int:user_id>', methods=['GET'])
def get_perfil(user_id):
    try:
        conn = sqlite3.connect('meubanco.db')
        cursor = conn.cursor()

        
        cursor.execute("""
            SELECT id, armario_id, data_entrega, status 
            FROM Tabela_de_Entregas 
            WHERE morador_id = ?
        """, (user_id,))

        user_data = cursor.fetchone()

        if user_data:
           
            perfil = {
                'nome_completo': f"{user_data[0]} {user_data[1]}",
                'telefone': user_data[2],
                'endereco': f"{user_data[3]}, {user_data[4]}, {user_data[5]}, {user_data[6]}, {user_data[7]}, {user_data[8]}",
            }
            return jsonify(perfil), 200
        else:
            return jsonify({'error': 'Usuário não encontrado.'}), 404

    except sqlite3.Error as e:
        return jsonify({'error': f'Erro ao buscar perfil: {str(e)}'}), 500
    finally:
        if conn:
            conn.close()


     #aqui tem atualizações       
@app.route('/Signin', methods=['POST'])
def signin():
    data = request.get_json()
    email = data.get('email')
    senha = data.get('senha1')

    try:
        conn = sqlite3.connect('meubanco.db')
        cursor = conn.cursor()

       #adicionar  tipo_usuario tbm aqui
        cursor.execute("""
            SELECT id, nome, sobrenome, cpf, telefone, 
                   cep, rua, N_ap, numero, bairro, cidade, estado ,  tipo_usuario
            FROM Cadastro 
            WHERE email = ? AND senha1 = ?
        """, (email, senha))
        user = cursor.fetchone()


        if user:
            user_id = user[0]
            nome = user[1]
            sobrenome = user[2]
            telefone = user[4]
            endereco = f"{user[5]} {user[6]}, {user[7]} {user[8]}, {user[9]}, {user[10]}, {user[11]}"
            tipo_usuario = user[12]  # adicionar tipo_usuario 

            return jsonify({
                'user': {
                    'id': user_id,
                    'nome': nome,
                    'sobrenome': sobrenome,
                    'telefone': telefone,
                    'endereco': endereco,
                     'tipo_usuario': tipo_usuario #adicionar tbm
                }
            }), 200
        else:
            return jsonify({'error': 'Credenciais inválidas'}), 401

    except sqlite3.Error as e:
        print(f"Erro ao realizar o login: {e}")
        return jsonify({'error': f"Erro ao realizar o login: {e}"}), 500

    finally:
        if conn:
            conn.close()


@app.route('/Armario', methods=['POST'])
def criar_armario():
    data = request.get_json()
    numero_armario = data.get('numero_armario')
    status = data.get('status')

    if not numero_armario or not status:
        return jsonify({'message': 'Número do armário e status são obrigatórios.'}), 400

    try:
        conn = sqlite3.connect('meubanco.db')
        cursor = conn.cursor()
        
        
        cursor.execute("SELECT COUNT(*) FROM Armario WHERE numero_armario = ?", (numero_armario,))
        existe = cursor.fetchone()[0]

        if existe:
            return jsonify({'message': 'Número de armário já existe.'}), 409

        cursor.execute("INSERT INTO Armario (numero_armario, status) VALUES (?, ?)", (numero_armario, status))
        conn.commit()

        return jsonify({'message': 'Armário criado com sucesso.'}), 201
    except sqlite3.Error as e:
        return jsonify({'error': f"Erro ao criar armário: {e}"}), 500
    finally:
        if conn:
            conn.close()

@app.route('/buscar_morador', methods=['GET'])
def buscar_morador():
    nome_completo = request.args.get('nome')
    if not nome_completo:
        return jsonify({'error': 'Nome não fornecido'}), 400

    partes_nome = nome_completo.split()
    nome = partes_nome[0]
    sobrenome = ' '.join(partes_nome[1:]) if len(partes_nome) > 1 else ''

    try:
        conn = sqlite3.connect('meubanco.db', timeout=10)
        cursor = conn.cursor()

        
        print(f'Buscando morador: Nome: {nome}, Sobrenome: {sobrenome}')

        if sobrenome:
            cursor.execute("SELECT id, nome, sobrenome, N_ap FROM Cadastro WHERE LOWER(nome)=? AND LOWER(sobrenome) LIKE ?", (nome.lower(), f'%{sobrenome.lower()}%'))
        else:
            cursor.execute("SELECT id, nome, sobrenome, N_ap FROM Cadastro WHERE LOWER(nome)=?", (nome.lower(),))

        moradores = cursor.fetchall()

        if not moradores:
            return jsonify({'message': 'Morador não encontrado', 'buscado': {'nome': nome, 'sobrenome': sobrenome}}), 404

        resultado = [{'id': morador[0], 'nome': morador[1], 'sobrenome': morador[2], 'N_ap': morador[3]} for morador in moradores]
        return jsonify(resultado), 200

    except sqlite3.Error as e:
        return jsonify({'error': f'Erro no banco de dados: {str(e)}'}), 500
    finally:
        if conn:
            conn.close()




@app.route('/depositar', methods=['POST'])
def depositar():
    data = request.get_json()
    
    morador_id = data.get('morador_id')  
    nome_completo = data.get('nome_completo')  
    senha = data.get('senha')
    armario_id = data.get('armario_id')

    if not morador_id or not senha or not nome_completo or not armario_id:
        return jsonify({'message': 'Morador ID, nome completo, senha e armário ID são obrigatórios.'}), 400

    try:
        conn = sqlite3.connect('meubanco.db')
        cursor = conn.cursor()

        
        url = "http://192.168.0.144"
        response = requests.get(url)

        cursor.execute("""INSERT INTO Tabela_de_Entregas (morador_id, nome_completo, data_entrega, status, armario_id)
                          VALUES (?, ?, ?, ?, ?)""",
                       (morador_id, nome_completo, datetime.now().isoformat(), 'A retirar', armario_id))
        conn.commit()

        
        
        conn.commit()
        
        return jsonify({'message': 'Entrega registrada com sucesso.'}), 201
    except sqlite3.Error as e:
        print(f"Erro ao registrar entrega: {e}") 
        return jsonify({'message': f'Erro ao registrar entrega: {e}'}), 500
    finally:
        if conn:
            conn.close()


@app.route('/entregar/<int:morador_id>', methods=['GET'])
def entregar(morador_id):
    try:
        conn = sqlite3.connect('meubanco.db')
        cursor = conn.cursor()

        cursor.execute("SELECT id, nome_completo, armario_id, data_entrega, status FROM Tabela_de_Entregas WHERE morador_id = ?", (morador_id,))
        entregas = cursor.fetchall()

   

        url = "http://192.168.0.144"
        response = requests.get(url)
        
        result = []
        for entrega in entregas:
            result.append({
                'id': entrega[0],
                'nome_completo': entrega[1],
                'armario_id': entrega[2],
                'data_entrega': entrega[3],
                'status': entrega[4],
            })

        return jsonify(result), 200

    except sqlite3.Error as e:
        print(f"Erro ao buscar entregas: {e}")
        return jsonify({'error': 'Erro ao buscar entregas'}), 500

    finally:
        if conn:
            conn.close()


@app.route('/entregar/<int:entrega_id>', methods=['PUT'])
def atualizar_entrega(entrega_id):
    try:
        conn = sqlite3.connect('meubanco.db')
        cursor = conn.cursor()

        data = request.json
        novo_status = data.get('status')
        armario_id = data.get('armario_id')  
        data_retirada = datetime.now().strftime('%d/%m/%Y %I:%M:%S %p')

      
        cursor.execute("""UPDATE Tabela_de_Entregas 
                          SET status = ?, data_retirada = ? 
                          WHERE id = ?""", 
                       (novo_status, data_retirada, entrega_id))

        
        conn.commit()

        return jsonify({'message': 'Entrega atualizada e armário liberado com sucesso.'}), 200

    except sqlite3.Error as e:
        print(f"Erro ao atualizar entrega: {e}")
        return jsonify({'error': 'Erro ao atualizar entrega'}), 500

    finally:
        if conn:
            conn.close()


            

@app.route('/minhas-entregas/<int:user_id>', methods=['GET'])
def minhas_entregas(user_id):
    try:
        conn = sqlite3.connect('meubanco.db')
        cursor = conn.cursor()
        
       
        cursor.execute("SELECT * FROM Tabela_de_Entregas WHERE id_usuario = ?", (user_id,))
        entregas = cursor.fetchall()

       
        if not entregas:
            return jsonify([]), 200

        result = []
        for entrega in entregas:
            result.append({
                'id': entrega[0],           
                'nome_completo': entrega[1],
                'data_entrega': entrega[2],
                'armario_id': entrega[3],
                'status': entrega[4],
            })

        return jsonify(result), 200

    except sqlite3.Error as e:
        print(f"Erro ao buscar entregas: {e}")
        return jsonify({'error': 'Erro ao buscar entregas', 'message': str(e)}), 500

    finally:
        if conn:
            conn.close()


    


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True) 