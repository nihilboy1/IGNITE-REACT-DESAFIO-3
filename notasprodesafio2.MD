handleCreateNewTask(){
    testar o "newtasktitle" pra ver se ele está vazio ou não. Caso esteja vazio, retornar e encerrar a função.
    criar uma variavel que recebe um objeto igual ao de "tasks", com um id random único, o titulo da task e o estado de complete como false
    definir o novo array de tasks passando uma af que recebe o oldstate de tasks e retorna um spread operator, com esse oldstate e o objeto com a nova task setado acima
    chama de volta a função de define o título da task para zerar o estado
}

handleRemoveTask(id: number){
    criar um filtro que percorra as tasks cadastradas e que retorne apenas as que tenham um id diferente do id da task selecionada
    chamar a função de settasks e passar o novo array de tasks filtradas
}


handleToggleTaskCompletion(id: number){
    criar uma variavel que recebe um map sobre o array de tasks atual e que teste sobre cada uma das tasks, se o id do parametro é igual ao id da task.
    se for igual, retorna a task, mas com o isCompleted invertido. Se for diferente, retorna apernas a task

    chama a função de setTasks passando a nova variavel
}




YARN TEST