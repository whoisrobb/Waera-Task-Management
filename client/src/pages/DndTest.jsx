import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

const DATA = [
    {
        id: '1',
        name: 'Walmart',
        items: [
            { id: '1a', name: 'Milk' },
            { id: '1b', name: 'Butter' }
        ],
        tint: 1
    },
    {
        id: '2',
        name: 'Indigo',
        items: [
            { id: '2a', name: 'Designing data intensive applications' },
            { id: '2b', name: 'Atomic habits' }
        ],
        tint: 2
    },
    {
        id: '3',
        name: 'Lowes',
        items: [
            { id: '3a', name: 'Hammer' },
            { id: '3b', name: 'Workbench' }
        ],
        tint: 3
    },
];

const DndTest = () => {
    const [stores, setStores] = useState(DATA);

    const handleDragDrop = (results) => {
        const { source, destination, type } = results;

        if (!destination) return;

        if (source.droppableId === destination.droppableId &&
            source.index === destination.index) return;

        if (type === 'group') {
            const reorderedStores = [...stores];
            const sourceIndex = source.index;
            const destinationIndex = destination.index;

            const [removedStore] = reorderedStores.splice(sourceIndex, 1);
            reorderedStores.splice(destinationIndex, 0, removedStore);

            return setStores(reorderedStores);
        }
    };

  return (
    <section id="dnd">
        <div className='wrapper'>
                <div className="card">
                    <DragDropContext
                        onDragEnd={handleDragDrop}
                    >
                        <div className="header">
                            <h1>Shopping list</h1>
                        </div>
                        <Droppable
                            droppableId='ROOT'
                            type='group'
                        >
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {stores.map((store, index) => (
                                        <Draggable
                                            key={store.id}
                                            draggableId={store.id}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <div
                                                    {...provided.dragHandleProps}
                                                    {...provided.draggableProps}
                                                    ref={provided.innerRef}
                                                >
                                                    <StoreList {...store} />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </div>
    </section>
  )
}

const StoreList = ({ name, items, id }) => {
    return (
        <Droppable
            droppableId={id}
        >
            {(provided) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                    <div className="store-container">
                        <h3>{name}</h3>
                    </div>
                    <div className="items-container">
                        {items.map((item, index) => (
                            <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                            >
                                {(provided) => (
                                    <div
                                        {...provided.dragHandleProps}
                                        {...provided.draggableProps}
                                        ref={provided.innerRef}
                                    >
                                        <h4 className="item" key={item.id}>
                                            {item.name}
                                        </h4>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                    </div>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}


export default DndTest;