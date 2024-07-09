import React, { Component } from "react";
import { getbooklist, getcatagory } from "./booklist";
import Filter from "./common/filter.component";
import Pagination from "./common/paginate.component";
import _ from "lodash";
import BooksTable from "./bookstable.component";

class Bookexit extends Component {
  state = {
    AllBook: getbooklist(),
    catagorys: [{ name: "All Books Catagory" }, ...getcatagory()],
    selectedcatagory: "All Books Catagory",
    activepage: 1,
    pagecount: 40,
    bookheader: ["ID", "Title", "Catagory", "Price"],
    sortColumn: { path: "id", order: "asc" },
    Addrow: false,
    inputData: "",
    cursor: true,
    isEdit: null,
    inputcategory: "",
    inputPrice: "",
  };

  handleCursor = () => {
    let inputData = this.state.inputData;
    let books = this.state.AllBook;
    const cursor = this.state.cursor;
    const isEdit = this.state.isEdit;
    const inputcategory = this.state.inputcategory;
    const inputPrice = this.state.inputPrice;

    if (!inputData || !inputcategory || !inputPrice) alert("fill the column");
    else if (!cursor && inputData && inputcategory && inputPrice) {
      this.setState(
        books.map((elem) => {
          if (elem.id === isEdit) {
            return {
              ...elem,
              title: inputData,
              category: inputcategory,
              price: inputData,
            };
          }
          return elem;
        })
      );
      this.setState({ cursor: true });
      this.setState({ books: "" });
      this.setState({ isEdit: null });
    } 
    else {
      const allinput = {
        id: books.length + 1,
        title: this.shortTitle(inputData),
        category: inputcategory,
        price: inputPrice,
      };

      books.push(allinput);

      this.setState({ inputData: "" });
      this.setState({ inputcategory: "" });
      this.setState({ inputPrice: "" });
      console.log(allinput);
    }
  };

  handleAddBooks = () => {
    let add = this.state.Addrow;
    if (add === false) add = true;
    else if (add === true) add = false;
    this.setState({ Addrow: add });
  };

  filterBooks = () => {
    const { AllBook, selectedcatagory } = this.state;

    const filteredBooks = AllBook.filter((book) => {
      if (selectedcatagory === "All Books Catagory") return true;
      if (book.category.includes(selectedcatagory)) return true;
      return false;
    });
    return filteredBooks;
  };

  paginatedBooks = (books) => {
    const { activepage, pagecount } = this.state;
    const start = (activepage - 1) * pagecount;
    const paginatedbooks = books.slice(start, start + pagecount);
    return paginatedbooks;
  };

  shortTitle = (title) => {
    var titl = "";
    if (title.length < 80) {
      return title;
    } else {
      for (var i = 0; i < 80; i++) {
        titl += title[i];
      }
      return titl;
    }
  };

  handleChangepage = (page) => {
    this.setState({ ...this.state, activepage: page });
  };

  handleGenre = (catagor) => {
    this.setState({ ...this.state, selectedcatagory: catagor, activepage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ ...this.state, sortColumn });
  };

  sortedBooks = (book) => {
    const { sortColumn } = this.state;
    const sortedBooks = _.orderBy(book, [sortColumn.path], [sortColumn.order]);
    return sortedBooks;
  };

  render() {
    const filtered = this.filterBooks();
    const sort = this.sortedBooks(filtered);
    const books = this.paginatedBooks(sort);

    return (
      <div className="row">
        <Filter
          filteredItems={this.state.catagorys.map((catagory, idx) => ({
            id: idx,
            name: catagory.name,
          }))}
          onclick={this.handleGenre}
          selectedItems={this.state.selectedcatagory}
        />

        <div className="col-lg-8">
          <BooksTable allbook={books} title={this.shortTitle} />

          <button
            onClick={() => this.handleAddBooks()}
            type="button"
            className="btn btn-primary"
          >
            Add
          </button>

          <br></br>

          {this.state.Addrow ? (
            <>
              <input
                placeholder="Enter your book name"
                value={this.state.inputData}
                onChange={(e) => this.setState({ inputData: e.target.value })}
              ></input>

              <br></br>

              <input
                placeholder="Enter your book category"
                value={this.state.inputcategory}
                onChange={(e) =>
                  this.setState({ inputcategory: e.target.value })
                }
              ></input>

              <br></br>

              <input
                placeholder="Enter your book price"
                value={this.state.inputPrice}
                onChange={(e) => this.setState({ inputPrice: e.target.value })}
              ></input>
            </>
          ) : null}

          <br></br>
          
          <button
            onClick={() => this.handleCursor()}
            className="btn btn-primary"
          >
            Submit
          </button>


          
         
          <Pagination
            total={filtered.length}
            pagecount={this.state.pagecount}
            activepage={this.state.activepage}
            onchangepage={this.handleChangepage}
          />
        </div>
      </div>
    );
  }
}

export default Bookexit;
