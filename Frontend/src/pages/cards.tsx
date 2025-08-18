import React ,{useState}from "react"

const Boards: React.FC = () => {
        const [lists, setLists] = useState([
            {
                id: 1,
                title: 'To do',
                cards: [
                    { id: 1, title: 'Project planning' },
                    { id: 2, title: 'Kickoff meeting' }
                ]
            },
            {
                id: 2,
                title: 'Doing',
                cards: []
            },
            {
                id: 3,
                title: 'Done',
                cards: [
                    { id: 3, title: 'Kickoff meeting' }
                ]
            }
        ]);

        const [newCardInputs, setNewCardInputs] = useState({});
        const [showAddList, setShowAddList] = useState(false);
        const [newListTitle, setNewListTitle] = useState('');

        const addCard = (listId) => {
            const cardTitle = newCardInputs[listId];
            if (cardTitle?.trim()) {
                setLists(lists.map(list =>
                    list.id === listId
                        ? { ...list, cards: [...list.cards, { id: Date.now(), title: cardTitle.trim() }] }
                        : list
                ));
                setNewCardInputs({ ...newCardInputs, [listId]: '' });
            }
        };

        const addList = () => {
            if (newListTitle.trim()) {
                const newList = {
                    id: Date.now(),
                    title: newListTitle.trim(),
                    cards: []
                };
                setLists([...lists, newList]);
                setNewListTitle('');
                setShowAddList(false);
            }
        };

        const toggleCardInput = (listId) => {
            setNewCardInputs({ ...newCardInputs, [listId]: newCardInputs[listId] !== undefined ? undefined : '' });
        };


        return (
            <div className="d-flex vh-100" style={{ backgroundColor: '#1d2125', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                {/* Top bar */}
                <div className="position-fixed w-100" style={{
                    height: '40px',
                    backgroundColor: '#1d2125',
                    zIndex: 1000,
                    borderBottom: '1px solid #2c333a'
                }}>
                    <div className="d-flex align-items-center justify-content-between h-100 px-2">
                        <div className="d-flex align-items-center">
                            <div
                                className="d-flex align-items-center justify-content-center me-3"
                                style={{
                                    width: '24px',
                                    height: '24px',
                                    backgroundColor: '#e34935',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '14px',
                                    borderRadius: '3px'
                                }}
                            >
                                S
                            </div>
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="p-2 mx-1" style={{ color: '#9fadbc' }}>🔔</div>
                            <div
                                className="d-flex align-items-center justify-content-center"
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    backgroundColor: '#e34935',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '12px',
                                    borderRadius: '50%',
                                    marginRight: '8px'
                                }}
                            >
                                S
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div style={{
                    width: '280px',
                    backgroundColor: '#1d2125',
                    paddingTop: '40px',
                    borderRight: '1px solid #2c333a'
                }}>
                    <div className="p-3">
                        <div className="mb-3">
                            <h6 style={{ color: '#9fadbc', fontSize: '12px', fontWeight: '500', margin: '0' }}>
                                Your boards
                            </h6>
                        </div>

                        <div className="mb-3">
                            <div
                                className="d-flex align-items-center p-2 rounded"
                                style={{
                                    backgroundColor: '#282e33',
                                    color: '#ffffff',
                                    fontSize: '14px',
                                    fontWeight: '500'
                                }}
                            >
                                <div className="me-2" style={{ fontSize: '16px' }}>📋</div>
                                <span>My Trello board</span>
                            </div>
                        </div>

                        <div className="mb-4">
                            <div style={{ color: '#9fadbc', fontSize: '12px', fontWeight: '500', marginBottom: '8px' }}>
                                Members
                            </div>
                            <div className="mb-2">
                                <div className="d-flex align-items-center" style={{ color: '#9fadbc', fontSize: '14px' }}>
                                    <div
                                        className="d-flex align-items-center justify-content-center me-2"
                                        style={{
                                            width: '24px',
                                            height: '24px',
                                            backgroundColor: '#e34935',
                                            color: 'white',
                                            fontSize: '10px',
                                            borderRadius: '50%'
                                        }}
                                    >
                                        S1
                                    </div>
                                    <span>User 1</span>
                                </div>
                            </div>
                            <div className="mb-2">
                                <div className="d-flex align-items-center" style={{ color: '#9fadbc', fontSize: '14px' }}>
                                    <div
                                        className="d-flex align-items-center justify-content-center me-2"
                                        style={{
                                            width: '24px',
                                            height: '24px',
                                            backgroundColor: '#e34935',
                                            color: 'white',
                                            fontSize: '10px',
                                            borderRadius: '50%'
                                        }}
                                    >
                                        S2
                                    </div>
                                    <span>User 2</span>
                                </div>
                            </div>
                            <div className="mb-2">
                                <div className="d-flex align-items-center" style={{ color: '#9fadbc', fontSize: '14px' }}>
                                    <div
                                        className="d-flex align-items-center justify-content-center me-2"
                                        style={{
                                            width: '24px',
                                            height: '24px',
                                            backgroundColor: '#e34935',
                                            color: 'white',
                                            fontSize: '10px',
                                            borderRadius: '50%'
                                        }}
                                    >
                                        S3
                                    </div>
                                    <span>User 3</span>
                                </div>
                            </div>
                            <div className="mb-2">
                                <div className="d-flex align-items-center" style={{ color: '#9fadbc', fontSize: '14px' }}>
                                    <div
                                        className="d-flex align-items-center justify-content-center me-2"
                                        style={{
                                            width: '24px',
                                            height: '24px',
                                            backgroundColor: '#e34935',
                                            color: 'white',
                                            fontSize: '10px',
                                            borderRadius: '50%'
                                        }}
                                    >
                                        S4
                                    </div>
                                    <span>User 4</span>
                                </div>
                            </div>
                        </div>

                        <div style={{
                            position: 'absolute',
                            bottom: '20px',
                            left: '20px',
                            right: '20px'
                        }}>
                            <div style={{
                                color: '#9fadbc',
                                fontSize: '12px',
                                marginBottom: '12px',
                                lineHeight: '1.4'
                            }}>
                                You can't find and reopen closed boards if close the board
                            </div>
                            <button
                                className="btn w-100"
                                style={{
                                    backgroundColor: '#e34935',
                                    color: 'white',
                                    fontSize: '13px',
                                    fontWeight: '500',
                                    border: 'none',
                                    padding: '8px 16px'
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-grow-1" style={{ paddingTop: '40px', backgroundColor: '#f4f5f7' }}>
                    {/* Board Header */}
                    <div className="d-flex align-items-center justify-content-between p-3" style={{
                        backgroundColor: '#0079bf',
                        color: 'white'
                    }}>
                        <h5 className="mb-0" style={{ fontSize: '18px', fontWeight: '600' }}>
                            My Trello board
                        </h5>
                        <button
                            className="btn btn-sm"
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                color: 'white',
                                border: 'none',
                                fontSize: '12px'
                            }}
                        >
                            ⚡ Invite member
                        </button>
                    </div>

                    {/* Lists Container */}
                    <div className="p-3">
                        <div className="d-flex" style={{ gap: '12px', overflowX: 'auto' }}>
                            {/* Lists */}
                            {lists.map(list => (
                                <div key={list.id} style={{
                                    width: '272px',
                                    backgroundColor: '#ebecf0',
                                    borderRadius: '8px',
                                    padding: '8px',
                                    flexShrink: 0
                                }}>
                                    <div className="d-flex align-items-center justify-content-between mb-2 px-2">
                                        <h6 className="mb-0" style={{
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            color: '#172b4d'
                                        }}>
                                            {list.title}
                                        </h6>
                                        <div style={{ color: '#6b778c', fontSize: '16px', cursor: 'pointer' }}>⋯</div>
                                    </div>

                                    {/* Cards */}
                                    {list.cards.map(card => (
                                        <div key={card.id} className="mb-2">
                                            <div style={{
                                                backgroundColor: 'white',
                                                padding: '8px 12px',
                                                borderRadius: '6px',
                                                fontSize: '14px',
                                                color: '#172b4d',
                                                cursor: 'pointer',
                                                boxShadow: '0 1px 0 rgba(9,30,66,0.25)'
                                            }}>
                                                {card.title}
                                            </div>
                                        </div>
                                    ))}

                                    {/* Add card input */}
                                    {newCardInputs[list.id] !== undefined ? (
                                        <div className="mb-2">
                                            <textarea
                                                className="form-control"
                                                style={{
                                                    fontSize: '14px',
                                                    border: 'none',
                                                    borderRadius: '6px',
                                                    resize: 'none',
                                                    minHeight: '60px'
                                                }}
                                                placeholder="Enter a title for this card..."
                                                value={newCardInputs[list.id]}
                                                onChange={(e) => setNewCardInputs({ ...newCardInputs, [list.id]: e.target.value })}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' && !e.shiftKey) {
                                                        e.preventDefault();
                                                        addCard(list.id);
                                                    }
                                                }}
                                                autoFocus
                                            />
                                            <div className="d-flex align-items-center mt-2" style={{ gap: '8px' }}>
                                                <button
                                                    className="btn btn-primary btn-sm"
                                                    onClick={() => addCard(list.id)}
                                                    style={{ fontSize: '12px' }}
                                                >
                                                    Add card
                                                </button>
                                                <div
                                                    style={{
                                                        fontSize: '20px',
                                                        color: '#6b778c',
                                                        cursor: 'pointer',
                                                        padding: '2px 6px'
                                                    }}
                                                    onClick={() => toggleCardInput(list.id)}
                                                >
                                                    ✕
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            className="d-flex align-items-center p-2"
                                            style={{
                                                color: '#6b778c',
                                                fontSize: '14px',
                                                cursor: 'pointer',
                                                borderRadius: '6px'
                                            }}
                                            onClick={() => toggleCardInput(list.id)}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ddd'}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                        >
                                            <span className="me-1">+</span>
                                            <span>Add a card</span>
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Add another list */}
                            <div style={{ width: '272px', flexShrink: 0 }}>
                                {!showAddList ? (
                                    <div
                                        className="d-flex align-items-center p-3"
                                        style={{
                                            backgroundColor: '#ffffff3d',
                                            color: 'white',
                                            fontSize: '14px',
                                            cursor: 'pointer',
                                            borderRadius: '8px'
                                        }}
                                        onClick={() => setShowAddList(true)}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ffffff52'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff3d'}
                                    >
                                        <span className="me-2">+</span>
                                        <span>Add another list</span>
                                    </div>
                                ) : (
                                    <div style={{
                                        backgroundColor: '#ebecf0',
                                        borderRadius: '8px',
                                        padding: '8px'
                                    }}>
                                        <input
                                            type="text"
                                            className="form-control mb-2"
                                            placeholder="Enter list title..."
                                            value={newListTitle}
                                            onChange={(e) => setNewListTitle(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') addList();
                                                if (e.key === 'Escape') {
                                                    setShowAddList(false);
                                                    setNewListTitle('');
                                                }
                                            }}
                                            style={{ fontSize: '14px' }}
                                            autoFocus
                                        />
                                        <div className="d-flex align-items-center" style={{ gap: '8px' }}>
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={addList}
                                                style={{ fontSize: '12px' }}
                                            >
                                                Add list
                                            </button>
                                            <div
                                                style={{
                                                    fontSize: '20px',
                                                    color: '#6b778c',
                                                    cursor: 'pointer',
                                                    padding: '2px 6px'
                                                }}
                                                onClick={() => {
                                                    setShowAddList(false);
                                                    setNewListTitle('');
                                                }}
                                            >
                                                ✕
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }

    export default Boards;