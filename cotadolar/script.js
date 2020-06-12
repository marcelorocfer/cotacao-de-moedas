cotacao = () => { 

    let dataCotacao = document.querySelector('#cotacao');
    let inputElement = dataCotacao.value;
    inputElement = moment(inputElement, 'YYYY-MM-DD').format('MM-DD-YYYY');

    clearInputDate = (() => dataCotacao.value = '');

    if(dataCotacao.value.length !== 0) {   

        let divResult = document.querySelector('#result');
        let divResultError = document.querySelector('#resultError');
        let divResultNoSelectedDate = document.querySelector('#resultNoSelectedDate');
        let divResultLoadImg = document.querySelector('#resultLoadImg');
        let divResultNetworkError = document.querySelector('#resultNetworkError');  
        
        let divResLoadImg = document.createElement('div');
        let resultLoadImg = divResultLoadImg.appendChild(divResLoadImg);
        resultLoadImg.innerHTML = `<span><img style="width:100px; heigth:100px; mar" src="./load.gif"></img></span>`;

        const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${inputElement}%27&$top=100&$format=json`;

        axios.get(url)                
            .then( response => {
                try {
                    let dataHoraCotacao = moment(response.data.value[0].dataHoraCotacao, 'YYYY-MM-DD HH:mm:ss.00Z').format('DD/MM/YYYY HH:mm:ss');
                    if (response.data.value[0].dataHoraCotacao > '1994-06-30 18:43:00.0') {                        
                        result.innerHTML = `<br>Compra: R$ ${response.data.value[0].cotacaoCompra}`;                        
                        result.innerHTML += `<br>Venda: R$ ${response.data.value[0].cotacaoVenda}`;                        
                        result.innerHTML += `<br><br>Data/hora da cotação: ${(dataHoraCotacao)}`; 
                    } else {
                        result.innerHTML = `<br>Compra: CR$ ${response.data.value[0].cotacaoCompra}`;                        
                        result.innerHTML += `<br>Venda: CR$ ${response.data.value[0].cotacaoVenda}`;                        
                        result.innerHTML += `<br><br>Data/hora da cotação: ${dataHoraCotacao}`; 
                    }
                    
                    divResultError.innerHTML = '';
                    divResultNoSelectedDate.innerHTML = ''; 
                    divResultNetworkError.innerHTML = '';
                    divResultLoadImg.innerHTML = '';
                    clearInputDate();

                } catch (error) {      
                    response.error === undefined ? resultError.innerHTML = `<br>Não há cotação para essa data!` : '';

                    divResult.innerHTML = ''; 
                    divResultNetworkError.innerHTML = '';
                    divResultNoSelectedDate.innerHTML = '';  
                    divResultLoadImg.innerHTML = '';
                    clearInputDate();   
                }
            })
            .catch( error => {
                resultNetworkError.innerHTML = `<br>Ocorreu um erro na sua requisição!`; 

                divResult.innerHTML = ''; 
                divResultError.innerHTML = ''; 
                divResultNoSelectedDate.innerHTML = ''; 
                divResultLoadImg.innerHTML = '';
                clearInputDate();
            })
    } else {
        resultNoSelectedDate.innerHTML = `<br>Selecione uma data para a cotação!`;

        result.innerHTML = ''; 
        resultError.innerHTML = '';  
        resultNetworkError.innerHTML = '';
    }
}


