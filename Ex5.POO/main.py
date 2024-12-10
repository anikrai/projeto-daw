'''5. Crie uma classe chamada SocialNetwork que represente uma rede social online. Essa
classe deve ter funcionalidades para adicionar amigos, publicar mensagens,
comentar em posts e buscar por usuários.'''

class UsuarioBase:
    def __init__(self, nome, email):
        self.nome = nome
        self.email = email
        self.amigos = []
        self.posts = []

    def adicionar_amigo(self, amigo):
        if amigo == self:
            print("Você não pode adicionar a si mesmo como amigo.")
            return

        if amigo not in self.amigos:
            self.amigos.append(amigo)
            amigo.amigos.append(self)
            print(f"{amigo.nome} agora é amigo(a) de {self.nome}.")
        else:
            print(f"{amigo.nome} já é seu amigo.")

    def publicar_post(self, post):
        self.posts.append(post)
        print(f"{self.nome} publicou: {post.conteudo}")

    def comentar_post(self, post, comentario):
        post.adicionar_comentario(self, comentario)
        print(f"{self.nome} comentou no post de {post.autor.nome}: {comentario}")

    def __str__(self):
        return self.nome


class PostBase:
    def __init__(self, conteudo, autor):
        self.conteudo = conteudo
        self.autor = autor
        self.comentarios = []

    def adicionar_comentario(self, usuario, comentario):
        self.comentarios.append((usuario, comentario))

    def mostrar_post(self):
        print(f"Post de {self.autor.nome}: {self.conteudo}")
        if self.comentarios:
            print("Comentários:")
            for comentario in self.comentarios:
                print(f"   {comentario[0].nome} comentou: {comentario[1]}")


class PostImagem(PostBase):
    def __init__(self, conteudo, autor, imagem):
        super().__init__(conteudo, autor)
        self.imagem = imagem

    def mostrar_post(self):
        super().mostrar_post()
        print(f"Imagem: {self.imagem}")


class PostVideo(PostBase):
    def __init__(self, conteudo, autor, video):
        super().__init__(conteudo, autor)
        self.video = video

    def mostrar_post(self):
        super().mostrar_post()
        print(f"Vídeo: {self.video}")


class PostFactory:
    @staticmethod
    def criar_post(tipo_post, conteudo, autor, midia=None):
        if tipo_post == '1':
            return PostBase(conteudo, autor)
        elif tipo_post == '2':
            return PostImagem(conteudo, autor, midia)
        elif tipo_post == '3':
            return PostVideo(conteudo, autor, midia)
        else:
            raise ValueError("Tipo de post inválido.")


class SocialNetwork:
    def __init__(self):
        self.usuarios = []

    def adicionar_usuario(self, nome):
        email = self.validar_email()
        if not email:
            return None

        usuario = UsuarioBase(nome, email)
        self.usuarios.append(usuario)
        print(f"Usuário {nome} ({email}) foi adicionado à rede.")
        return usuario
    
    def buscar_usuario_por_nome(self, nome_procurado):
        usuarios_encontrados = [usuario for usuario in self.usuarios if usuario.nome.lower() == nome_procurado.lower()]
        
        if not usuarios_encontrados:
            print("Usuário não encontrado.")
            return None

        if len(usuarios_encontrados) == 1:
            usuario = usuarios_encontrados[0]
            print(f"Usuário encontrado: {usuario.nome} ({usuario.email})")
            return usuario
        else:
            # Exibe a lista de usuários com o mesmo nome
            print(f"Vários usuários encontrados com o nome '{nome_procurado}':")
            for i, usuario in enumerate(usuarios_encontrados, start=1):
                print(f"{i}. {usuario.nome} ({usuario.email})")

            try:
                num_selecao = int(input("Selecione o número do usuário que você estava procurando: ")) - 1
                if 0 <= num_selecao < len(usuarios_encontrados):
                    usuario_selecionado = usuarios_encontrados[num_selecao]
                    print(f"Usuário selecionado: {usuario_selecionado.nome} ({usuario_selecionado.email})")
                    return usuario_selecionado
                else:
                    print("Número inválido.")
            except ValueError:
                print("Entrada inválida. Por favor, insira um número.")
        return None

    def validar_email(self):
        while True:
            email = input("Email do usuário: ")
            if '@' not in email:
                print("Email inválido. O email deve conter '@'. Tente novamente.")
                continue
            if any(usuario.email == email for usuario in self.usuarios):
                print(f"Já existe um usuário cadastrado com o email {email}.")
                continue
            return email

    def buscar_usuario_por_numero(self, numero):
        if 0 <= numero < len(self.usuarios):
            return self.usuarios[numero]
        print("Número de usuário inválido.")
        return None

    def listar_usuarios(self):
        if not self.usuarios:
            print("Nenhum usuário cadastrado.")
            return
        print("Usuários cadastrados:")
        for i, usuario in enumerate(self.usuarios, start=1):
            print(f"{i}. {usuario.nome} ({usuario.email})")

    def listar_posts(self, usuario):
        if not usuario.posts:
            return  # Não imprime nada se o usuário não tiver posts
        print(f"Posts de {usuario.nome}:")
        for i, post in enumerate(usuario.posts, start=1):
            print(f"{i}. {post.conteudo}")


def menu():
    rede = SocialNetwork()
    print("-=" * 30)
    while True:
        print("MENU:")
        print("1. Adicionar Usuário")
        print("2. Adicionar Amigo")
        print("3. Publicar Post")
        print("4. Comentar em Post")
        print("5. Buscar Usuário")
        print("6. Sair\n")

        escolha = input("Escolha uma opção: ")
        print()

        if escolha == '1':
            nome = input("Nome do usuário: ")
            rede.adicionar_usuario(nome)

        elif escolha == '2':
            rede.listar_usuarios()  # Exibir lista de usuários
            try:
                num1 = int(input("Número do usuário que vai adicionar um amigo: ")) - 1
                num2 = int(input("Número do amigo a ser adicionado: ")) - 1
                usuario1 = rede.buscar_usuario_por_numero(num1)
                usuario2 = rede.buscar_usuario_por_numero(num2)
                if usuario1 and usuario2:
                    usuario1.adicionar_amigo(usuario2)
            except ValueError:
                print("Entrada inválida. Por favor, insira números.")

        elif escolha == '3':
            rede.listar_usuarios()  # Exibir lista de usuários
            try:
                num = int(input("Número do usuário que vai publicar: ")) - 1
                usuario = rede.buscar_usuario_por_numero(num)
                if usuario:
                    print("\nEscolha o tipo de post:")
                    print("1. Texto")
                    print("2. Imagem")
                    print("3. Vídeo")
                    tipo_post = input("Digite o número do tipo de post: ")
                    conteudo = input("Escreva o conteúdo do post: ")

                    if tipo_post in ['2', '3']:
                        midia = input("Insira a URL da mídia (imagem ou vídeo): ")
                        post = PostFactory.criar_post(tipo_post, conteudo, usuario, midia)
                    else:
                        post = PostFactory.criar_post(tipo_post, conteudo, usuario)

                    usuario.publicar_post(post)

            except ValueError:
                print("Entrada inválida. Por favor, insira um número.")

        elif escolha == '4':
            rede.listar_usuarios()  # Exibir lista de usuários
            try:
                num = int(input("Número do usuário que vai comentar: ")) - 1
                usuario = rede.buscar_usuario_por_numero(num)
                if usuario:
                    amigos_com_posts = [amigo for amigo in usuario.amigos if amigo.posts]

                    if not amigos_com_posts:
                        print("Nenhum amigo tem posts para comentar.")
                        continue

                    # Exibir lista de amigos com posts
                    print("Amigos com posts:")
                    for i, amigo in enumerate(amigos_com_posts, start=1):
                        print(f"{i}. {amigo.nome}")

                    try:
                        num_autor = int(input("Número do autor do post que você deseja comentar: ")) - 1
                        if 0 <= num_autor < len(amigos_com_posts):
                            usuario_autor = amigos_com_posts[num_autor]
                            rede.listar_posts(usuario_autor)  # Exibir os posts do autor selecionado

                            if usuario_autor.posts:
                                num_post = int(input("Número do post para comentar: ")) - 1
                                if 0 <= num_post < len(usuario_autor.posts):
                                    comentario = input("Escreva seu comentário: ")
                                    usuario.comentar_post(usuario_autor.posts[num_post], comentario)
                                else:
                                    print("Número de post inválido.")
                            else:
                                print(f"{usuario_autor.nome} não tem posts.")
                        else:
                            print("Número de autor inválido.")
                    except ValueError:
                        print("Entrada inválida. Por favor, insira um número.")
            except ValueError:
                print("Entrada inválida. Por favor, insira um número.")

        elif escolha == '5':
            nome_procurado = input("Nome do usuário a ser buscado: ")
            rede.buscar_usuario_por_nome(nome_procurado)

        elif escolha == '6':
            break

        print("-=" * 30)


menu()
