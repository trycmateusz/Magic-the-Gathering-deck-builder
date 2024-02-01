# Magic the Gathering Deck Builder - Recrutiment Task.

This project was made for a recruitment task for [Loyaltek](https://www.loyaltek.com).
It's an app that fetches data from ([Magic the Gathering Developers](https://docs.magicthegathering.io)) and uses it to create your own Magic the Gathering deck.
My task was to make it possible to create a deck, view it's average mana cost and check for it's cards maximum amount.<br>
I highlighted the aspects of the challenge by creating a component that was avaiable on both pages and updated the data accordingly to user adding more cards to the deck.
Also, I focused on how to fetch the data the most efficiently from the API I was provided with.
Because of that, throughtout the creating process I had to change some of my ideas (sets being fetched instead of a static array for example).
Another thing in terms of efficiency is the cards are fetched after no filters are changed for a certain amount of time.<br>
This was a revision of React for me, beacause for some time I focused mainly on Vue and it's libraries.
This task made me realize that I can work very effectively even with tight deadlines and tools I'm not 100% comfortable with.
At the end I'm very happy with how the whole thing turned out, even though it's a simple application : D .
<br>
<img src="https://github.com/trycmateusz/trycmateusz/blob/main/aintmuch.jpg?raw=true" alt="A farmer looking at the camera with the text `it ain't much, but it's honest work`" width="240" />

## Features

- advanced filtering
- RWD
- an original design
- acessible to screen readers
- user friendly
- versatile components

## Functionality

Here's a list of all the different things you can do on this site:

### Adding cards to deck

- ability to add cards to your deck (also multiple instances of one card)
- using many filters to fetch specific cards from API and view them
- fetching specific card set's and fetching it's cards
- quick filter reset

### Viewing your deck

- having the info about your deck's average mana cost at all times
- having the info about the amount of cards in your deck (as well as a maximum and minimum amount)

while on /deck:

- possibility to filter your deck with the same filters provided when adding cards to a deck

Live: [https://magic-the-gathering-deck-builder.vercel.app](https://magic-the-gathering-deck-builder.vercel.app)

## Techstack
- Next.js
- React
- TypeScript
- REST API ([Magic the Gathering Developers](https://docs.magicthegathering.io))
- Redux
- Tailwind CSS
- Sass
