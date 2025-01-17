describe("URL Shortener", () => {
  beforeEach(() => {
    cy.intercept('http://localhost:3001/api/v1/urls', {
      "urls": [
        {
          "id": 1,
          "long_url": "https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
          "short_url": "http://localhost:3001/useshorturl/1",
          "title": "Awesome photo"
        },
        {
          "id": 2,
          "long_url": "https://i.pinimg.com/originals/f6/f7/c9/f6f7c9701f04b50baacf6a0cbf63f05c.jpg",
          "short_url": "http://localhost:3001/useshorturl/2",
          "title": "Another cool photo"
        }
      ]
    })
    .visit('localhost:3000/')
  })

  it('Should render a page title', () => {
    cy.get('h1').should('have.text', "URL Shortener")
  })

  it('Should render shortened URLs based on fetched data', () => {
    cy.get('h3').first().should('have.text', 'Awesome photo')
      .get('a').first().should('have.text', 'http://localhost:3001/useshorturl/1')
      .get('p').first().should('have.text', 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
      .get('h3').last().should('have.text', 'Another cool photo')
      .get('a').last().should('have.text', 'http://localhost:3001/useshorturl/2')
      .get('p').last().should('have.text', 'https://i.pinimg.com/originals/f6/f7/c9/f6f7c9701f04b50baacf6a0cbf63f05c.jpg')
  })

  it('Should render a Form with inputs and a button', () => {
    cy.get('input[name="title"]').invoke('attr', 'placeholder').should('contain', 'Title...')
      .get('input[name="urlToShorten"]').invoke('attr', 'placeholder').should('contain', 'URL to Shorten...')
      .get('button').first().should('have.text', 'Shorten Please!')
  })

  it('Should reflect what the user types within the input fields', () => {
    cy.get('input[name="title"]').type('Sweet pic')
      .should('have.value', 'Sweet pic')
      .get('input[name="urlToShorten"]').type('https://c.ndtvimg.com/2019-10/o52ta3a8_sweets-_625x300_26_October_19.jpg')
      .should('have.value', 'https://c.ndtvimg.com/2019-10/o52ta3a8_sweets-_625x300_26_October_19.jpg')
  })

  it('Should render a new shortened URL after the user fills + submits form', () => {
    cy.get('input[name="title"]').type('Sweet pic')
      .get('input[name="urlToShorten"]').type('https://c.ndtvimg.com/2019-10/o52ta3a8_sweets-_625x300_26_October_19.jpg')
      .get('button').first().click()
      .get('h3').last().should('have.text', 'Sweet pic')
      .get('a').last().should('have.text', 'http://localhost:3001/useshorturl/3')
      .get('p').last().should('have.text', 'https://c.ndtvimg.com/2019-10/o52ta3a8_sweets-_625x300_26_October_19.jpg')
  })

  it('Should display an error message when one or both inputs are missing', () => {
    cy.get('button').first().click()
      .get('.add-error').should('have.text', 'Please fill both inputs!')
      .get('input[name="title"]').type('Sweet pic')
      .get('button').first().click()
      .get('.add-error').should('have.text', 'Please fill both inputs!')
  })
})

describe('Fetch Error Handling', () => {
  it('Should render an error message when there is an error with fetching data', () => {
    cy.intercept('http://localhost:3001/api/v1/urls', {
      statusCode:404
    })
      .visit('http://localhost:3000')
      .get('.error')
      .should('have.text', 'Uh oh, could not get URL data.')
  })
})

describe("Delete Buttons / Requests", () => {
  beforeEach(() => {
    cy.intercept('http://localhost:3001/api/v1/urls', {
      "urls": [
        {
          "id": 1,
          "long_url": "https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
          "short_url": "http://localhost:3001/useshorturl/1",
          "title": "Awesome photo"
        },
        {
          "id": 2,
          "long_url": "https://i.pinimg.com/originals/f6/f7/c9/f6f7c9701f04b50baacf6a0cbf63f05c.jpg",
          "short_url": "http://localhost:3001/useshorturl/2",
          "title": "Another cool photo"
        }
      ]
    })
    .visit('localhost:3000/')
  })

  it('Should render a delete button on each URL and no longer render the card after clicking', () => {
    cy.get('h3').first().should('have.text', 'Awesome photo')
      .get('a').first().should('have.text', 'http://localhost:3001/useshorturl/1')
      .get('p').first().should('have.text', 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
      
      .get('.delete-button').first().click()
      .get('.delete-button').last().click()

      .get('h3').should('not.exist')
      .get('a').should('not.exist')
  })
})