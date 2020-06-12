consulta = () => { 
    const item = document.querySelector("#coins");
    const coins = item.options[item.selectedIndex].value;
    const url = 'https://economia.awesomeapi.com.br/all/';

    const divResultA = document.querySelector('#resultA');
    const divResultB = document.querySelector('#resultB');
    const divVarBid = document.querySelector('#resultVarBid');
    const divPctChange = document.querySelector('#resultPctChange');
    const divHigh = document.querySelector('#resultHigh');
    const divLow = document.querySelector('#resultLow');   

    axios.get(url)                
        .then( response => {    
                        
            const result = () => {
                
                for (let index = 0; index < Object.keys(response.data).length; index++) {
                    
                    const keyElement = Object.keys(response.data)[index];
                    const valueElement = Object.values(response.data)[index];

                    if (coins == keyElement) {
                        divResultB.innerHTML = `<br><b>Compra: </b>R$ ${valueElement.bid}`; 
                        divResultA.innerHTML = `<br><b>Venda: </b>R$ ${valueElement.ask}`;
                        divVarBid.innerHTML = `<br><b>Variação: </b>${valueElement.varBid}%`;
                        divPctChange.innerHTML = `<br><b>Porcentagem de Variação: </b>${valueElement.pctChange}%`;
                        divHigh.innerHTML = `<br><b>Máximo: </b>R$ ${valueElement.high}`;
                        divLow.innerHTML = `<br><b>Mínimo: </b>R$ ${valueElement.low}`;

                    } else if(coins == 0) {
                        divResultA.innerHTML = `<br>Selecione uma moeda!`; 
                        divResultB.innerHTML = ``; 
                        divVarBid.innerHTML = ``;
                        divPctChange.innerHTML = ``;
                        divHigh.innerHTML = ``;
                        divLow.innerHTML = ``;   
                    }
                }
            }

            result();          
                     
        })
        .catch( error => {
            divResultA.innerHTML = `<br>Ocorreu um erro durante a sua consulta!<br>`;
            divResultB.innerHTML = ``; 
            console.log(error);
        })    
}
