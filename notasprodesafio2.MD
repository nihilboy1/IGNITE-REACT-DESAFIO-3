primeiro definimos o valor da variavel cartSize. Como no componente Header a gente ta recebendo o array de produtos "cart" e a quantidade de cada item especifico está setada no amount de cada item, pra saber a quntidade de itens distintos no carrinho, só precisamos contar quantos itens existem em "cart"

----------------------------------------------------------------

Dentro do useCart, precisamos definir o valor inicial pro state cart. Como valor inicial, esse estado recebera uma função que cria uma variavel storagedCart que recebe o getitem do localstorage. depois, faz-se um teste nessa variavel pra ver se ela está populada ou não. se sim, passamos ela pra json e retornamos. Se não, retornamos apenas o array vazio.

Agora, vamos a função de addProduct("id"){
    try
        criamos uma variavel "x" que recebe o estado atual de "cart" através do spread operator, para podermos manter a imutabilidade
        -
        agora criamos uma variavel "y" que vai receber uma iteração do método find sobre a variavel "x". testando se o "id" que nós recebemos como parametro, bate com algum id já cadastrado no cart. Se sim, a variavel recebe o objeto em questão
        -
        agora criamos uma variavel "z" que vai receber o retorno de uma consulta .get em /stock/"id". 
        -
        agora criamos uma variavel "p" para o "amount" desse produto. que recebe de "z".data.amount // Essa é a variavel da quantidade disponivel desse item no estoque
        -
        agora criamos a variavel "a" que testa se a variavel "y" é verdadeira. se for, ela recebe "y".amount, se não, recebe 0 // essa é a variavel da quantidade de itens de mesmo id no carrinho.
        -
        agora criamos uma variavel "j" que recebe a variavel "a" + 1 // essa é a variavel da quantidade daquele item desejada pelo usuário
        -
        agora fazemos um teste. Se a variavel "j" > "p" devemos enviar um erro com o toastify pois não temos produtos suficientes em estoque e logo apos, retornamos para o código não seguir
        -
        Teste seguinte: Se a a variavel "y" for verdadeira, "y".amount = "j" / Senão: Definimos uma variavel "b" que recebe o retorno de uma consulta .get em /products/"id".
        agora, definimos uma variavel "t" que recebe um objeto com o spread operator de "b", adicionando a propriedade "amount" com valor "1"
        agora, damos um "x".push("t")
        -
        agora, chamamos o setCart("x") para perpetuar as alterações na cópia do cart e chamamos o setItem do localStorage para também perpetuar lá as mesmas alterações, passando para string o "x" que está em json
    catch
        aqui, temos que enviar a mensagem de erro do toastify
}

----------------------------------------------------------------
Agora vamos até a home, na variavel cartItemsAmout que recebe cart.reduce((sumAmount, product) => {
    aqui, definimos uma variavel "a" que recebe o spread operator do sumAmount em formato de objeto
    agora, a variavel "a" na [product.id] = product.amount

    return "a"
})

agora, no useEffect do home, dentro da função loadProducts(){
    variavel "a" recebe retorno assíncrono de api.get em /products
    agora, a variavel "b" recebe o retorno de "a".data.map(product => ({
        spread operator de product e atributo necessário do preço formatado, que recebe o retorno da função formatPrice sobre product.price
    }))
    agora, mantendo a imutabilidade, chamamos o setProducts passando a variavel "b"
}

handleAddProduct(id){
    apenas chamamos o addProduct passando o id do parametro
}

agora, no proprio componente, iteramos com um map sobre o product e retornamos o jsx


----------------------------------------------------------------
De volta ao useCart, iremos até a função removeProduct(id){
    try
        variavel "a" recebe uma cópia do estado de cart com spread operator
        -
        variavel "b" recebe "a".findIndex testando se o id do produto atual da iteração, bate com o id passado como parametro
        -
        agora testamos se a "b" >= 0: se sim, "a".splice("b", 1), agora, chamamos o setCart("a") para perpetuar as alterações na cópia do cart e chamamos o setItem do localStorage para também perpetuar lá as mesmas alterações, passando para string o "a" que está em json
        se não: força um erro com throw Error() pra ele cair no catch e mostrar a mensagem do toastify

    catch
        aqui retornamos o erro com o toastify definido para esse local
}

Agora, na função updateProductAmount({productId, amount}){
    try
        se amount <= 0 {
            return pra sair da função
        }
        
        variavel "a" recebe o retorno de uma consulta do tipo get em /stock/productId
        variavel "b" recebe "a".data.amount // variavel responsavel por monitorar a quantidade daquele item no estoque

        se amount > "b"{
            erro toatify respectivo
            return
        }

        -

        variavel "c" recebe o spread operator de cart pra não quebrar a imutabilidade
        variavel "d" recebe "c".find(product => product.id === productId)

        se "d" for verdadeiro{
            "d".amount = amount
            agora, chamamos o setCart("c") para perpetuar as alterações na cópia do cart e chamamos o setItem do localStorage para também perpetuar lá as mesmas alterações, passando para string o "c" que está em json
        } 
        senão{
            força um erro com throw Error() pra ele cair no catch e mostrar a mensagem do toastify
        }


    catch
        erro toastify correspondente
}


--------------------------------
Agora, dentro do cart, na função cartFormatted, que recebe de cart.map(("a") => ({
    primeiro passamos o "a" desestruturado com spread operator, 
    depois o priceFormatted, que recebe o retorno de FormatPrice sobre "a".price
    depois o subtotal que recebe o retorno de FormatPrice sobre "a".price * a.amount
}))

const total = formatPrice(cart.reduce((acc, item) => {
    retorna o acc + item.price * item.amount
}, 0))

-

handleProductIncrement(product){
    updateProductAmount({productId: product.id, amount: product.amount + 1})
}

-

handleProductDecrement(product){
    updateProductAmount({productId: product.id, amount: product.amount - 1})
}

-

handleRemoveProduct(productId){
    removeProduct(productId)
}


--------------------------------
agora dentro da tag tbody do jsx:
    recortar todo o conteudo e abrir um map em cartFormatted e pra cada iteração, retornar o conteudo. Agora, mudando tudo que está estático, para o conteudo dos métodos do product