from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS
from datetime import datetime 





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

    # Tabela de Entregas
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS Tabela_de_Entregas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        morador_id INTEGER,
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


from flask import Flask, jsonify
import sqlite3

app = Flask(__name__)

@app.route('/perfil/<int:user_id>', methods=['GET'])
def get_perfil(user_id):
    try:
        conn = sqlite3.connect('meubanco.db')
        cursor = conn.cursor()

        # Buscar o usuário no banco de dados
        cursor.execute("""
            SELECT nome, sobrenome, telefone, rua, N_ap, numero, bairro, cidade, estado 
            FROM Cadastro 
            WHERE id=?
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



            
@app.route('/Signin', methods=['POST'])
def signin():
    data = request.get_json()
    email = data.get('email')
    senha = data.get('senha1')

    

    try:
        conn = sqlite3.connect('meubanco.db')
        cursor = conn.cursor()

       
        cursor.execute("SELECT id, nome FROM Cadastro WHERE email = ? AND senha1 = ?", (email, senha))
        user = cursor.fetchone()

        if user:
            user_id = user[0]  
            nome = user[1]  
            return jsonify({'message': f'Login bem-sucedido, bem-vindo {nome}', 'userId': user_id}), 200
        else:
            return jsonify({'error': 'Credenciais inválidas'}), 401

    except sqlite3.Error as e:
        print(f"Erro ao realizar o login: {e}")
        return jsonify({'error': f"Erro ao realizar o login: {e}"}), 500

    finally:
        if conn:
            conn.close()


@app.route('/Armarios', methods=['POST'])
def criar_armario():
    data = request.get_json()
    numero_armario = data.get('numero_armario')
    status = data.get('status')

    if not numero_armario or not status:
        return jsonify({'message': 'Número do armário e status são obrigatórios.'}), 400

    try:
        conn = sqlite3.connect('meubanco.db')
        cursor = conn.cursor()
        
        cursor.execute("SELECT numero_armario FROM Armario WHERE numero_armario IN (1, 2)")
        armarios_existentes = cursor.fetchall()

        if 1 not in [armario[0] for armario in armarios_existentes]:
            cursor.execute("""
                INSERT INTO Armario (numero_armario, status)
                VALUES (1, 'disponível')
            """)

        if 2 not in [armario[0] for armario in armarios_existentes]:
            cursor.execute("""
                INSERT INTO Armario (numero_armario, status)
                VALUES (2, 'disponível')
            """)

        
        cursor.execute("""
            INSERT INTO Armario (numero_armario, status)
            VALUES (?, ?)
        """, (numero_armario, status))

        conn.commit()
        return jsonify({'message': 'Armário criado com sucesso.'}), 201
    except sqlite3.IntegrityError:
        return jsonify({'message': 'Número de armário já existe.'}), 409
    except sqlite3.Error as e:
        return jsonify({'error': f"Erro ao criar armário: {e}"}), 500
    finally:
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
        conn = sqlite3.connect('meubanco.db')
        cursor = conn.cursor()

        if sobrenome:
            cursor.execute("SELECT id, nome, sobrenome, N_ap FROM Cadastro WHERE nome=? AND sobrenome LIKE ?", (nome, f'%{sobrenome}%'))
        else:
            cursor.execute("SELECT id, nome, sobrenome, N_ap FROM Cadastro WHERE nome=?", (nome,))

        moradores = cursor.fetchall()

        if not moradores:
            return jsonify({'message': 'Morador não encontrado'}), 404

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
    
    nome = data.get('nome')
    senha = data.get('senha')
   
    if not nome or not senha:
        return jsonify({'message': 'Morador ID e senha são obrigatórios.'}), 400

    try:
        conn = sqlite3.connect('meubanco.db')
        cursor = conn.cursor()
        
        
        cursor.execute("""INSERT INTO Tabela_de_Entregas (morador_id, data_entrega, status, armario_id)
                          VALUES (?, ?, ?, ?)""",
                       (nome, datetime.now(), 'Entregue', data.get('armario_id')))
        conn.commit()
        
        return jsonify({'message': 'Entregue.'}), 201
    except sqlite3.Error as e:
        return jsonify({'message': f'Erro ao registrar entrega: {e}'}), 500
    finally:
        if conn:
            conn.close()



@app.route('/Retirar/<int:user_id>', methods=['GET'])
def retirar(user_id):
    try:
        conn = sqlite3.connect('meubanco.db')
        cursor = conn.cursor()

        # Selecionar encomendas do usuário logado
        cursor.execute("SELECT id, armario_id, data_entrega, status FROM Tabela_de_Entregas WHERE id = ?", (user_id,))
        encomendas = cursor.fetchall()

        # Transformar os resultados em um dicionário
        result = []
        for encomenda in encomendas:
            result.append({
                'id': encomenda[0],
                'armario_id': encomenda[1],
                'data_entrega': encomenda[2],
                'status': encomenda[3],
            })

        return jsonify(result), 200

    except sqlite3.Error as e:
        print(f"Erro ao buscar encomendas: {e}")
        return jsonify({'error': 'Erro ao buscar encomendas'}), 500

    finally:
        if conn:
            conn.close()






if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True) 
