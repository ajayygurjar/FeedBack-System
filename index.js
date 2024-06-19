function handleFormSubmit(event) {
    event.preventDefault();
    const feedDetail = {
      feedName: event.target.name.value,
      feedRating: event.target.select.value,
    };

    axios
      .post('https://crudcrud.com/api/eda2b49789814ff6856698aeda5d152d/FeedBackSystem', feedDetail)
      .then(result => {
        displayFeedOnScreen(result.data);
        event.target.reset();
        updateRatings();
      })
      .catch(error => console.error(error));
  }

  document.addEventListener('DOMContentLoaded', () => {
    axios
      .get('https://crudcrud.com/api/eda2b49789814ff6856698aeda5d152d/FeedBackSystem')
      .then(result => {
        result.data.forEach(feed => displayFeedOnScreen(feed));
        updateRatings();
      })
      .catch(error => console.error(error));
  });

  function displayFeedOnScreen(feedDetail) {
    const ul = document.getElementById('listOfFeedbacks');
    const li = document.createElement('li');
    li.textContent = `${feedDetail.feedName} - ${feedDetail.feedRating}`;

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'DELETE';
    deleteBtn.addEventListener('click', () => deleteFeed(feedDetail, li));
    li.appendChild(deleteBtn);

    // Edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'EDIT';
    editBtn.addEventListener('click', () => editFeed(feedDetail, li));
    li.appendChild(editBtn);

    ul.appendChild(li);
  }

  function deleteFeed(feedDetail, li) {
    axios
      .delete(`https://crudcrud.com/api/eda2b49789814ff6856698aeda5d152d/FeedBackSystem/${feedDetail._id}`)
      .then(() => {
        li.remove();
        updateRatings();
      })
      .catch(error => console.error(error));
  }

  function editFeed(feedDetail, li) {
    document.getElementById('name').value = feedDetail.feedName;
    document.getElementById('select').value = feedDetail.feedRating;
    deleteFeed(feedDetail, li);
  }

  function updateRatings() {
    const ratings = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    const feedbackItems = document.querySelectorAll('#listOfFeedbacks li');

    for (let i = 0; i < feedbackItems.length; i++) {
      const li = feedbackItems[i];
      const rating = parseInt(li.textContent.split(' - ')[1]);
      ratings[rating]++;
    }

    document.getElementById('oneStar').value = ratings[1];
    document.getElementById('twoStar').value = ratings[2];
    document.getElementById('threeStar').value = ratings[3];
    document.getElementById('fourStar').value = ratings[4];
    document.getElementById('fiveStar').value = ratings[5];
  }