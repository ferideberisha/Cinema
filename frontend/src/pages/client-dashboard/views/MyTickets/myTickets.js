import React, { useState } from "react";

function MyTickets() {
  const [myTickets, setMyTickets] = useState([]);

  // Function to add a new ticket to the myTickets state
  const addTicket = (newTicket) => {
    setMyTickets((prevTickets) => [...prevTickets, newTicket]);
  };

  // Function to cancel a ticket
  const cancelTicket = (ticketId) => {
    setMyTickets((prevTickets) =>
      prevTickets.filter((ticket) => ticket.id !== ticketId)
    );
  };

  return (
    <div>
      <h2>My Tickets</h2>
      {myTickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        <ul>
          {myTickets.map((ticket) => (
            <li key={ticket.id}>
              <h3>{ticket.movie}</h3>
              <p>Seat: {ticket.seat}</p>
              <p>Date: {ticket.date}</p>
              <p>Time: {ticket.time}</p>
              <button onClick={() => cancelTicket(ticket.id)}>
                Cancel Ticket
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyTickets;
