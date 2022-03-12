const items = document.querySelectorAll('.item')
const placeholders = document.querySelectorAll('.placeholder')

items.forEach(item =>{
    item.addEventListener('dragstart', () => {
        item.classList.add('hold')
    })

    item.addEventListener('dragend', () => {
        item.classList.remove('hold')
    })
})




placeholders.forEach(placeholder => {
    placeholder.addEventListener('dragover', e => {
        e.preventDefault()
        const afterel = getDragAfterElement(placeholder, e.clientY)
        const item = document.querySelector('.hold')
        if(afterel == null ){
            placeholder.appendChild(item)
         }else{
             placeholder.insertBefore(item, afterel)
         }
        // const item = document.querySelector('.hold')
    })
})

function getDragAfterElement (placeholder, y) {        
    const draggableItems =[ ...placeholder.querySelectorAll('.item:not(.hold)')]

    return draggableItems.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        if(offset < 0 && offset > closest.offset){
            return {offset: offset, element: child}
        }else{
            return closest
        }
    },{offset: Number.NEGATIVE_INFINITY}).element
}    