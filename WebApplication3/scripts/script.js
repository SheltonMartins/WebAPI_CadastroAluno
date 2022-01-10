var tbody = document.querySelector('table tbody');
		var aluno = {};

		function Cadastrar(){
			
			aluno.nome = document.querySelector('#nome').value;
			aluno.sobrenome = document.querySelector('#sobrenome').value;
			
			if (aluno.id === undefined || aluno.id === 0){
			salvarEstudantes('POST', 0, aluno);	
			}
			else{
			salvarEstudantes('PUT', aluno.id, aluno);
			}
			carregaEstudantes();
			Cancelar();


		}


	

		function carregaEstudantes() {

			tbody.innerHTML = '';

			var xhr = new XMLHttpRequest();



			xhr.open(`GET`, `https://localhost:44324/api/aluno/`, true);

			xhr.onerror = function(){
				console.log('ERRO', xhr.readyState);
			}


			xhr.onload = function (){
				var estudantes = JSON.parse(this.responseText);
				for(var indice in estudantes){
					adicionaLinha(estudantes[indice]);
				}
			}

			xhr.send();	
			

			
		}

		function salvarEstudantes(metodo, id, corpo) {

			var xhr = new XMLHttpRequest();

			if (id === undefined || id === 0)
			id='';
			 	
			xhr.open(metodo, `https://localhost:44324/api/aluno/${id}`, false);

			xhr.setRequestHeader('content-type', 'application/json');
			xhr.send(JSON.stringify(corpo));


			
		}

		function excluirEstudante(id){
			var xhr = new XMLHttpRequest();
			 	
			xhr.open(`DELETE`, `https://localhost:44324/api/aluno/${id}`, false);

			xhr.send();
		}

		function excluir(estudante){
			bootbox.confirm({
		    	message: `TEM CERTEZA QUE DESEJA EXCLUIR ${estudante.nome} ${estudante.sobrenome}?`,
		    		buttons: {
		        		confirm: {
		            	label: 'SIM',
		            	className: 'btn-success'
		        	},
		        	cancel: {
		            label: 'NÃO',
		            className: 'btn-danger'
		        	}
		    	},
		    	callback: function (result) {
		        	if (result){
					excluirEstudante(estudante.id);
					carregaEstudantes();
			}
		   		}
			});

		}

		carregaEstudantes();

		function editarEstudante(estudante){

			var btnSalvar = document.querySelector('#btnSalvar');

			var titulo = document.querySelector('#Titulo');
			document.querySelector('#nome').value = estudante.nome;
			document.querySelector('#sobrenome').value = estudante.sobrenome;
			btnSalvar.textContent = 'Salvar';

			titulo.textContent = `Editar aluno ${estudante.nome}`;


			aluno = estudante;

		}



		function Cancelar(){
			var btnSalvar = document.querySelector('#btnSalvar');

			var titulo = document.querySelector('#Titulo');

			btnSalvar.textContent = 'Cadastrar';
	
			titulo.textContent = 'Cadastrar aluno';

			document.querySelector('#nome').value = '';
			document.querySelector('#sobrenome').value = '';

			aluno.id = undefined;

			$('#myModal').modal('hide');
		}

		function adicionaLinha(estudante){
			

			var trow = `<tr>
							<td>${estudante.id}</td>
							<td>${estudante.nome}</td>
							<td>${estudante.sobrenome}</td>
							<td><button class="btn btn-info" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal" onClick='editarEstudante(${JSON.stringify(estudante)})'>Editar</button>
							<button class="btn btn-danger" onClick='excluir(${JSON.stringify(estudante)})'>Excluir</button></td>
						</tr>
						`	
			tbody.innerHTML += trow;
		}
