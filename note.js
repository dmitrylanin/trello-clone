const Note = {

	noteIdCounter:8, 
	draggedNode: null,

	process(noteElement){
		noteElement.addEventListener("dblclick", function(event){
		noteElement.setAttribute("contenteditable", "true"); 
//ТРЕБОВАНИЕ: запрет на возможность перетаскивания редактируемой карточки 
		noteElement.removeAttribute("draggable")
//ТРЕБОВАНИЕ: запрет на возможность перетаскивания родителя редактируемой карточки  
		noteElement.closest(".column").removeAttribute("draggable")
		noteElement.focus(); 
		})

		noteElement.addEventListener("blur", 
			function(event){ noteElement.removeAttribute("contenteditable"); 

//ТРЕБОВАНИЕ: карточка ушла из фокуса - ее можно перетаскивать 
				noteElement.setAttribute("draggable", "true")
//ТРЕБОВАНИЕ: дочерняя карточка ушла из фокуса - ее родителя можно перетаскивать 
				noteElement.closest(".column").removeAttribute("draggable")
//ТРЕБОВАНИЕ: если в элементе нет контента, элемент удаляется
				if(!noteElement.textContent.trim().length){
					noteElement.remove();
				}
			}
		)

		noteElement.addEventListener("dragstart", Note.dragstart)
		noteElement.addEventListener("dragend", Note.dragend)
		noteElement.addEventListener("dragenter", Note.dragenter)
		noteElement.addEventListener("dragover", Note.dragover)
		noteElement.addEventListener("dragleave", Note.dragleave)
		noteElement.addEventListener("drop", Note.drop)		
	},

	dragstart(event){
				//console.log("dragstart", event, this);
		Note.draggedNode = this; 
		this.classList.add("dragged");
		event.stopPropagation();
	},

	dragend(event){
		//console.log("dragend", event, this);
		Note.draggedNode = null; 
		this.classList.remove("dragged");

		document
			.querySelectorAll(".note")
			.forEach(x => x.classList.remove("under"))
	},

/*
	ТРЕБОВАНИЕ: когда перетаскиваемая карточка находится над статичной карточкой, 
	статичная карточка должна становиться бледнее

	Функция обрабатывает событие dragover - как ведет себя элемент,
	над которым находится перетаскиваемый объект 
*/
	dragenter(event){
		if(this === Note.draggedNode){
			return;
		}
		this.classList.add("under")
	},


/*
	ТРЕБОВАНИЯ: 
		1. когда перетаскиваемая карточка уводится из зоны "нижней карточки",
		нижняя карточка "возвращает полный цвет"
		2. обработка события dragover должна осуществляться не системно, а программируемо =>
		нужно event.preventDefault();

*/
	dragover(event){
		event.preventDefault();

		if(this === Note.draggedNode){
			return;
		}
	},

	dragleave(event){
		if(this === Note.draggedNode){
			return;
		}
		this.classList.remove("under")
	},


/*
	ОБРАБОТКА СОБЫТИЯ "бросание"

	ТРЕБОВАНИЯ: 
		продумать 2 ситуации: 
		- если у переносимоного элемента и элемента, над которым он расположен, общий 
		родитель => речь о том, что поменять их местами 
		- если у переносимоного элемента и элемента, над которым он расположен, родители разные
		=> элемент добавляется в новую колонку. В ЭТОМ СЛУЧАЕ ИСПОЛЬЗУЕМ insertBefore

*/
	drop(event){
		console.log(this.draggedNode);
		console.log(this);
		
		//блокируем всплытие события - 1.22.55
		event.stopPropagation(); 

		if(this === Note.draggedNode){
			return;
		}

		if(this.parentElement === Note.draggedNode.parentElement){
			const note = Array.from(this.parentElement.querySelectorAll(".note"))
			const indexA = note.indexOf(this);
			const indexB = note.indexOf(Note.draggedNode); 

			if(indexA<indexB){
				this.parentElement.insertBefore(Note.draggedNode, this)
			}else{
				this.parentElement.insertBefore(Note.draggedNode, this.nextElementSibling);
			}
		}else{
			this.parentElement.insertBefore(Note.draggedNode, this);
		}
	}
}