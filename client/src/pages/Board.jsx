import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { backgroundColor, serverUrl } from '../utils/utils';
import { useTask } from '../components/TaskProvider';

const Board = () => {
    const { boardId } = useParams();
    const { setCard, setCardTrue, activeCard } = useTask();

    const [boardDetails, setBoardDetail] = useState(null);
    const [createList, setCreateList] = useState(false);
    const [createCard, setCreateCard] = useState({});
    const [listMenu, setListMenu] = useState({});
    const [lists, setLists] = useState(null);
    const [listName, setListName] = useState('');
    const [cardName, setCardName] = useState('');

    useEffect(() => {
      fetchBoard();
      fetchLists();
    }, [])

    useEffect(() => {
      fetchBoard();
      fetchLists();
    }, [boardId, activeCard])

    const fetchBoard = async () => {
      try {
        const response = await fetch(`${serverUrl}/user/boards/board/${boardId}`);
        const data = await response.json();
        setBoardDetail(data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchLists = async () => {
      try {
        const response = await fetch(`${serverUrl}/user/lists/${boardId}`);
        const data = await response.json();
        setLists(data);
      } catch (err) {
        console.error(err);
      }
    };

    const handleCreateList = async (e) => {
      e.preventDefault();

      try {
        const response = await fetch(`${serverUrl}/user/lists/create/${boardId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ listName })
        })
        .then((response) => {
          if (response.ok) {
            const data = response.json();
            setCreateList(false);
            setListName('');
            fetchLists();
          }
        })
      } catch (err) {
        console.error(err);
      }
    };

    const handleCreateCard = async (listId) => {
      try {
        const response = await fetch(`${serverUrl}/user/cards/create/${listId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ cardName })
        })
        .then((response) => {
          if (response.ok) {
            setCardName('');
            setCreateCard(null);
            fetchLists();
          }
        })
      } catch (err) {
        console.error(err);
      }
    };

    const deleteList = async (listId) => {
        try {
            const response = await fetch(`${serverUrl}/user/lists/delete/${listId}`, {
                method: 'DELETE'
            })
            .then((response) => {
                if (response.ok) {
                    fetchLists() 
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
                  fetchLists();
              }
          })
      } catch (err) {
          console.error(err);
      }
  };

  return (
    <section id='board'>
      {boardDetails &&
        <div className="wrapper">
          <div className="board-header">
            <h3>{boardDetails.BoardName}</h3>
          </div>
          <div className="board-workspace">
            {lists &&
              lists.map((list) => (
                <div className="list-item" key={list.ListID} onMouseLeave={() => setListMenu(null)}>
                  <div className="list-header">
                    <h4>{list.ListName}</h4>
                    <div className="btn-group">
                      <button className="" onClick={() => setCreateCard(createCard === list.ListID ? null : list.ListID)}>+</button>
                      <button className="" onClick={() => setListMenu(listMenu === list.ListID ? null : list.ListID)}>:</button>
                    </div>
                    {listMenu === list.ListID &&
                      <div className="list-menu modal">
                        <button className="" onClick={() => {deleteList(list.ListID)}}>delete list</button>
                      </div>}
                  </div>
                    {createCard === list.ListID &&
                    <form className='list-card-form' onSubmit={(e) => {e.preventDefault(); handleCreateCard(list.ListID);}}>
                      <div className="input-group">
                        <input
                            type="text"
                            name="cardName"
                            placeholder="card name"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                        />
                      </div>
                      <div className="btn-group">
                        <button type="submit" className='primary'>create</button>
                        <button type="button" className='secondary' onClick={() => setCreateCard(null)}>cancel</button>
                      </div>
                    </form>}
                    {list.Cards.map((card) => (
                      <div
                        key={card.CardID}
                        // onClick={() => {setCard(card); setCardTrue();}}
                      >
                        <CardItem card={card} deleteCard={deleteCard} />
                      </div>
                    ))}
                </div>
              ))
            }
            <div className="create-list">
              <button className="toggle-list-input" onClick={() => setCreateList(prev => !prev)}>create list</button>
              {createList &&
              <form onSubmit={handleCreateList} className='list-card-form'>
                <div className="input-group">
                    {/* <label htmlFor="listName">list name</label> */}
                        <input
                            type="text"
                            name="listName"
                            placeholder="list name"
                            value={listName}
                            onChange={(e) => setListName(e.target.value)}
                        />
                </div>
                <div className="btn-group">
                  <button type="submit" className='primary'>create</button>
                  <button type="button" className='secondary' onClick={() => setCreateList(false)}>cancel</button>
                </div>
              </form>}
            </div>
          </div>
        </div>
      }
    </section>
  )
}

export default Board


const CardItem = ({ card, deleteCard }) => {
  const { setCard, setCardTrue } = useTask();
  const [cardMenu, setCardMenu] = useState({});
  const [attNum, setAttNum] = useState(null);
  const [color, setColor] = useState(null);

  const countAtt = () => {
    let num = 0

    for (let i = 0; i < card.Attachments.length; i++) {
      num+=1
    }
    setAttNum(num);
  }

  const bgStyles = {
    background: `linear-gradient(180deg, rgba(${color}, 0.15), rgba(${color}, .1))`
  };

  const bgClr = () => {
    const color = backgroundColor();
    setColor(color)
  };
  
// background: linear-gradient(180deg, rgba(0, 255, 255, 0.15), rgba(0, 255, 255, .1));

  useEffect(() => {
    countAtt()
    bgClr()
  }, [])

  return (
    <div className="card-item" style={bgStyles}>
      <div className="card-header" onMouseLeave={() => setCardMenu(null)}>
        <h3>{card.CardName}</h3>
        <button className="modal-toggle" onClick={() => setCardMenu(cardMenu === card.CardID ? null : card.CardID)}>:</button>
        {cardMenu === card.CardID &&
          <div className="card-menu modal">
            <button className="" onClick={() => {setCard(card); setCardTrue(); setCardMenu(null);}}>open card</button>
            <button className="" onClick={() => {deleteCard(card.CardID)}}>delete card</button>
            <button className="" onClick={bgClr}>change color</button>
          </div>
        }
      </div>
      <div
        style={{ cursor: 'pointer' }}
        onClick={() => {setCard(card); setCardTrue();}}
        className="card-body">
        {card.Labels.length >= 1 &&
        <div className='card-labels'>
            <div className="labels-wrapper">
                {card.Labels.map((cardLabel) => (
                    <div className="label-group" key={cardLabel.LabelID}>
                        <div className="label-item"
                            // style={{ backgroundColor: `#${cardLabel.Color}` }}
                            style={{ backgroundColor: 'white' }}
                        >
                            {/* <p style={{ mixBlendMode: 'difference', color: 'white'  }}>{cardLabel.LabelName}</p> */}
                            <p style={{ color: `#${cardLabel.Color}` }}>{cardLabel.LabelName}</p>
                            {/* <p>{cardLabel.LabelName}</p> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>}
        <div className="card-description">
          <div className='content' dangerouslySetInnerHTML={{ __html: card.Description }}/>
        </div>
        {card.Checklists.map((checklist) => (
          <div className="checklist" key={checklist.ChecklistID}>
            <p>{checklist.ChecklistName}</p>
            {card.Checklists &&
            <ul>
              {checklist.ChecklistItems.map((item, index) => (
                  <li key={index}>
                    <div className="checkbox-container">
                        <input className="custom-checkbox"
                            checked={item.ItemComplete}
                            readOnly
                            type="checkbox"
                        />
                        <span style={{ background: item.ItemComplete ? `rgb(${color})` : '' }} className="checkmark"></span>
                        {item.ChecklistItemText}
                    </div>
                  </li>
              ))}
            </ul>}
          </div>
        ))}
      </div>
      {card.Attachments.length >= 1 &&
      <div className="card-footer">
          <div className="attachment-items">{attNum} attachments</div>
      </div>
      }
    </div>
  )
}