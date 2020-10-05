const Column = {

	counter: 4, 

/*
	К узлу, содержащему атрибут data-action-addNote], добавляется обработчик события "Клик"
	Обработчик:
		- создает новый узел Div-типа
		- добавляет ей класс note
		- добавляет аттрибут draggable
		- добавляет атрибут с номером заметки 
	! увеличивает на единицу номер заметки 
		- добавляет новую заметку к колонке
	
	В рамках обработки блока с новой колонкой, к ее блоку с заголовком добавляется 
	обработчик события "dblclick"
	Обработчик:
		- помещает фокус на элемент
		- добавляет к узлу атрибут, позволяющий редактировать его содержание


*/

	process(columnElement){
		const spanAction_addNote = columnElement.querySelector('[data-action-addNote]');

		spanAction_addNote.addEventListener('click', 
			function(event){

				const noteElement = document.createElement('div')
				noteElement.classList.add('note')
				noteElement.setAttribute('draggable', 'true'); 
				noteElement.setAttribute('data-note-id', Note.noteIdCounter); 
				Note.noteIdCounter++; 
				columnElement.querySelector('[data-notes]').append(noteElement);
				Note.process(noteElement); 

				//сразу вызываем событие чтобы сразу редактировать новую карточку
				noteElement.setAttribute("contenteditable", "true")
				noteElement.focus();

			}
		)

		const headerElement = columnElement.querySelector(".column-header"); 

		headerElement.addEventListener("dblclick", function(event){
			headerElement.setAttribute("contenteditable", "true");
			headerElement.focus();
		})

		headerElement.addEventListener("blur", function(event){
			headerElement.removeAttribute("contenteditable");
		})	

/*
	ОБРАБОТКА СОБЫТИЯ "бросание"

	ТРЕБОВАНИЯ: 
	- нужно обрабатывать ситуацию когда заметку нужно закинуть в новую колонку без заметок
	- карточки встают НАД кнопкой "Добавить карточку"

*/
		columnElement.addEventListener("dragover", function(event){
			event.preventDefault(); 
		})

		columnElement.addEventListener("drop", 
			function(event){
				if(Note.draggedNode){
					return columnElement.querySelector('[data-notes]').append(Note.draggedNode);
				}else{

				}
			}
		)
	}, 



}