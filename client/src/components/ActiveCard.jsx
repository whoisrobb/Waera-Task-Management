import React, { useEffect, useState } from 'react'
import { useTask } from './TaskProvider'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useDropzone } from 'react-dropzone';
import { randomColor, serverUrl } from '../utils/utils'


const ActiveCard = () => {
    const { setCardFalse, cardItem, activeChecklists } = useTask();

    const [cardId, setCardId] = useState(null);
    const [cardName, setCardName] = useState(null);
    const [activeDescription, setActiveDescription] = useState(false);
    const [description, setDescription] = useState(null);
    const [checklists, setChecklists] = useState([]);
    const [cardLabels, setCardLabels] = useState([]);
    const [labels, setLabels] = useState([]);
    const [savedAttachments, setSavedAttachments] = useState([]);
    const [attachments, setAttachments] = useState([]);
    const [createLabelName, setCreateLabelName] = useState('');
    const [createLabel, setCreateLabel] = useState(false);
    const [createChecklist, setCreateChecklist] = useState(false);
    const [createChecklistName, setCreateChecklistName] = useState('');
    const [createAttachments, setCreateAttachments] = useState(false);

    useEffect(() => {
        if (cardItem) {
            setCardId(cardItem.CardID);
            setCardName(cardItem.CardName);
            setDescription(cardItem.Description);
            setChecklists(cardItem.Checklists);
            setCardLabels(cardItem.Labels);
            setSavedAttachments(cardItem.Attachments);
        }
        fetchLabels()
    }, [])

    const onDrop = (acceptedFiles) => {
        setAttachments(acceptedFiles);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleLabel = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${serverUrl}/user/label`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ labelName: createLabelName, color: randomColor() })
            })
            .then((response) => {
                if (response.ok) {
                    setCreateLabelName('');
                    fetchLabels();
                }
            })
        } catch (err) {
            console.error(err);
        }
    };

    const fetchLabels = async () => {
        try {
            const response = await fetch(`${serverUrl}/user/labels`);
            const data = await response.json();
            setLabels(data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchAttachments = async () => {
        try {
            const response = await fetch(`${serverUrl}/user/attachments`);
            const data = await response.json();
        } catch (err) {
            console.error(err);
        }
    };

    const removeLabel = (index) => {
        const newLabels = [...cardLabels];
        newLabels.splice(index, 1);
        setCardLabels(newLabels);
    };
    
    const updateChecklistItems = (checklistIndex, updatedItems) => {
        const updatedChecklists = [...checklists];
        updatedChecklists[checklistIndex].ChecklistItems = updatedItems;
        setChecklists(updatedChecklists);
    };
  
    const handleUpdateCard = async (cardId) => {
    
        try {
            const response = await fetch(`${serverUrl}/user/cards/updateCard/${cardId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                    // cardName: ,
                    // dueDate: ,
                    description: description,
                    checklists: checklists,
                    labelIds: cardLabels.map((label) => label.LabelID)
                }),
            });
    
            if (response.ok) {
                const updatedCard = await response.json();
                setCardFalse();
            } else {
                console.error('Failed to update card:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating card:', error);
        }
    };

    const handleAttachments = async (cardId) => {
        const formData = new FormData();
        
        attachments.forEach((file, index) => {
            formData.append('file', file);
        });
        
        try {
            const response = await fetch(`${serverUrl}/user/cards/attachments/${cardId}`, {
                method: 'POST',
                body: formData
            })
            .then((response) => {
                if (response.ok) {
                    setAttachments([]);
                }
            })
        } catch (err) {
            console.error(err);
        }
    };

    const deleteCard = async (cardId) => {
        try {
            const response = await fetch(`${serverUrl}/user/cards/delete/${cardId}`, {
                method: 'DELETE'
            })
            .then((response) => {
                if (response.ok) {
                    localStorage.setItem('activeCard', []);
                    setCardFalse();
                }
            })
        } catch (err) {
            console.error(err);
        }
    };
    
  return (
    <div className='active-card'>
        {cardItem &&
        <>
            <div className="card-header">
                <h3 className='card-name'>{cardName}</h3>
                <div className="btn-group">
                    <button onClick={() => {deleteCard(cardId);}}><i className="uil uil-trash-alt"></i></button>
                    <button onClick={() => {handleUpdateCard(cardId); localStorage.setItem('activeCard', []);}}><i className="uil uil-times"></i></button>
                </div>
            </div>
            <div className="card-body">
                <div className="card-inputs">
                    <div className="card-description">
                        <h3 className='input-head'>
                            <i className="uil uil-file-alt"></i>
                            description
                        </h3>
                        <DescriptionComponent
                            activeDescription={activeDescription}
                            setActiveDescription={setActiveDescription}
                            setDescription={setDescription}
                            description={description}
                        />
                    </div>
                    {cardLabels.length >= 1 &&
                    <div className='card-labels'>
                        <h3 className='input-head'>
                            <i className="uil uil-tag"></i>
                            labels
                        </h3>
                        <div className="labels-wrapper">
                            {cardLabels.map((cardLabel, index) => (
                                <div className="label-group" key={cardLabel.LabelID}>
                                    <div className="label-item"
                                        style={{ backgroundColor: `#${cardLabel.Color}` }}
                                        onClick={() => setCardLabels([...cardLabels, cardLabel])}
                                    >
                                        <p style={{ mixBlendMode: 'difference', color: 'white'  }}>{cardLabel.LabelName}</p>
                                    </div>
                                    <button onClick={() => removeLabel(index)}><i className="uil uil-times"></i></button>
                                </div>
                            ))}
                        </div>
                    </div>
                    }
                    {checklists.length >= 1 &&
                    <div className="card-checklists">
                        <h3 className='input-head'>
                            <i className="uil uil-check-square"></i>
                            checklists
                        </h3>
                        <div className="checklists-wrapper">
                            {checklists.map((checklist, index) => (
                                <Checklist
                                    key={index}
                                    checklist={checklist}
                                    checklistIndex={index}
                                    updateChecklistItems={updateChecklistItems}
                                />
                            ))}
                        </div>
                    </div>}
                </div>
                <div className="action-btns">
                    <div className="labels">
                        <button className="secondary" onClick={() => setCreateLabel((prev) => !prev)}>labels</button>
                        {createLabel &&
                        <div className="modal">
                            <div className="modal-header">
                                <h3>labels</h3>
                                <button className="close" onClick={() => setCreateLabel(false)}><i className="uil uil-times"></i></button>
                            </div>
                            <form onSubmit={handleLabel}>
                                <input
                                    type="text"
                                    value={createLabelName}
                                    placeholder='create new label'
                                    onChange={(e) => setCreateLabelName(e.target.value)}
                                />
                                <button className="primary">create</button>
                            </form>
                            labels
                            {labels &&
                            <div className="available-labels">
                                {labels.map((label, index) => (
                                    <button
                                        key={index}
                                        style={{ backgroundColor: `#${label.Color}` }}
                                        onClick={() => setCardLabels([...cardLabels, label])}
                                    >
                                        <p style={{ mixBlendMode: 'difference', color: 'white'  }}>{label.LabelName}</p>
                                    </button>
                                ))}
                            </div>}
                        </div>}
                    </div>
                    <div className="checklists">
                        <button className="secondary" onClick={() => setCreateChecklist((prev) => !prev)}>checklists</button>
                        {createChecklist &&
                        <div className="modal">
                            <div className="modal-header">
                                <h3>checklists</h3>
                                <button className="close" onClick={() => setCreateChecklist(false)}><i className="uil uil-times"></i></button>
                            </div>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                setChecklists([...checklists, { ChecklistName: createChecklistName, ChecklistItems: [] }]);
                                setCreateChecklistName('');
                                setCreateChecklist(false);
                                }}
                            >
                                <input
                                    type="text"
                                    value={createChecklistName}
                                    placeholder='create new checklist'
                                    onChange={(e) => setCreateChecklistName(e.target.value)}
                                />
                                <button className="primary">create</button>
                            </form>
                        </div>}
                    </div>
                    <div className="attachments">
                        <button className="secondary" onClick={() => setCreateAttachments((prev) => !prev)}>attachments</button>
                        {createAttachments &&
                        <div className="modal">
                            <div className="modal-header">
                                <h3>attachments</h3>
                                <button className="close" onClick={() => setCreateAttachments(false)}><i className="uil uil-times"></i></button>
                            </div>
                            <div
                                {...getRootProps()}
                                style={{
                                    border: '2px dashed #eee',
                                    padding: '20px',
                                    textAlign: 'center',
                                    cursor: 'pointer'
                                }}
                            >
                                <input {...getInputProps()} />
                                Drag & Drop
                            </div>
                            {attachments.map((file, index) => (
                                <div key={index} className="file">
                                    <p>{file.name}</p>
                                    <h6>{file.type}</h6>
                                </div>
                            ))}
                            {attachments.length >= 1 && <button onClick={() => handleAttachments(cardId)} className="primary">save</button>}
                        </div>}
                    </div>
                </div>
            </div>
        </>
        }
    </div>
  )
}

export default ActiveCard


const DescriptionComponent = ({ activeDescription, setActiveDescription, description, setDescription }) => {
    return (
        <div className='description-wrapper'>
        {activeDescription ?
            <>
                <ReactQuill value={description} onChange={(value) => setDescription(value)} />
                <button className="primary" onClick={() => setActiveDescription(false)}>add</button>
            </>
            :
            <div>
                {description ?
                    <div
                        onClick={() => setActiveDescription(true)}
                        className='content' dangerouslySetInnerHTML={{ __html: description }}
                        style={{ cursor: 'pointer' }}
                    />
                    :
                    <button onClick={() => setActiveDescription(true)} className='secondary'>enter description</button>
                }
            </div>
        }
        </div>
    )
}

const Checklist = ({ checklist, checklistIndex, updateChecklistItems }) => {
    const [checklistItems, setChecklistItems] = useState(checklist.ChecklistItems);
    const [createChecklistItemName, setCreateChecklistItemName] = useState('');
    const [createChecklistItem, setCreateChecklistItem] = useState(false);

    // Function to update checklist items and notify the parent
    const handleToggleItem = (index) => {
        const updatedItems = [...checklistItems];
        updatedItems[index].ItemComplete = !updatedItems[index].ItemComplete;
        setChecklistItems(updatedItems);
        updateChecklistItems(checklistIndex, updatedItems);
    };

    const handleRemoveItem = (index) => {
        const updatedItems = [...checklistItems];
        updatedItems.splice(index, 1);
        setChecklistItems(updatedItems);
        updateChecklistItems(checklistIndex, updatedItems);
    };

    const handleCreateItem = () => {
        const newChecklistItem = { ChecklistItemText: createChecklistItemName, ItemComplete: false }
        setChecklistItems([...checklistItems, newChecklistItem]);
        updateChecklistItems(checklistIndex, [...checklistItems, newChecklistItem]);
        setCreateChecklistItemName('');
    };

    return (
        <>
            <p>{checklist.ChecklistName}</p>
            {checklistItems && checklistItems.map((item, index) => (
                <li key={index}>
                    <div className="checkbox-container">
                        <input className=""
                            checked={item.ItemComplete}
                            onChange={() => handleToggleItem(index)}
                            type="checkbox"
                        />
                        <p>{item.ChecklistItemText}</p>
                    </div>
                    <button className='remove' onClick={() => handleRemoveItem(index)}><i className="uil uil-times"></i></button>
                </li>
            ))}
            {createChecklistItem &&
            <form onSubmit={(e) => {e.preventDefault(); handleCreateItem();}}
            >
                <input
                    type="text"
                    value={createChecklistItemName}
                    placeholder='create checklist item'
                    onChange={(e) => setCreateChecklistItemName(e.target.value)}
                />
                <button className="primary">create</button>
            </form>}
            {createChecklistItem ?
                <button className="secondary toggle-checklist-input" onClick={() => setCreateChecklistItem(false)}>done</button>
                :
                <button className="secondary toggle-checklist-input" onClick={() => setCreateChecklistItem(true)}>create item</button>
            }
        </>
    )
}