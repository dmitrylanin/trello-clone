
document
	.querySelectorAll('.column')
	.forEach(Column.process);

document
		.querySelectorAll(".note")
		.forEach(Note.process); 

/*
	Узел, содержащий текст - "Добавить карточку" - должен прослушивать событие "Клик"
	Новая колонка должна быть стилистически оформлена как другие колонки
	При появлении новой колонки индекс их количества должен увеличиваться на единицу

	!!!С помощью innerHTML добавляем к новой колонке базовую логику:
		- заголовок
		- блок для заметок
		- подвал
	
	Добавляем новосозданную колонку на страницу

	Отправляем новую колонку в качестве аргумента функции columnProcess, которая 
	найдет внутри "скелета" колонки кнопку для навешивания обработчика события на 
	располагающуюся в колонку кнопку "Добавить карточку" 

*/
document
	.querySelector("[data-action-addColumn]")
	.addEventListener(
		"click", function(event){
			const columnElement = document.createElement("div"); 
			columnElement.setAttribute("draggable", 'true');
			columnElement.classList.add("column"); 
			columnElement.setAttribute("data-column-id", Column.counter);
			Column.counter++; 

			columnElement.innerHTML = `<p class="column-header" contenteditable="true">В плане</p>
			<div data-notes>			
			</div>
			<p class="column-footer">
				<span data-action-addNote class="action">+ Добавить карточку</span>
			</p>`;

			document.querySelector(".columns").append(columnElement); 
			Column.process(columnElement);
		}
	)