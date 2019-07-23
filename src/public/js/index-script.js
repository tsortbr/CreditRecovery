window.addEventListener('DOMContentLoaded', (ev) => {
    /**
     * Tabulator
     * Ref: http://tabulator.info/
     */
    //define some sample data
    var tabledata = [
        { id: 1, name: "Oli Bob", age: "12", col: "red", dob: "" },
        { id: 2, name: "Mary May", age: "1", col: "blue", dob: "14/05/1982" },
        { id: 3, name: "Christine Lobowski", age: "42", col: "green", dob: "22/05/1982" },
        { id: 4, name: "Brendon Philips", age: "125", col: "orange", dob: "01/08/1980" },
        { id: 5, name: "Margret Marmajuke", age: "16", col: "yellow", dob: "31/01/1999" },
    ];

    //create Tabulator on DOM element with id "example-table"
    let opt1 = {
        height: 205, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
        data: tabledata, //assign data to table
        layout: "fitColumns", //fit columns to width of table (optional)
        columns: [ //Define Table Columns
            { title: "Name", field: "name", width: 150 },
            { title: "Age", field: "age", align: "left" },
            { title: "Favourite Color", field: "col" },
            { title: "Date Of Birth", field: "dob", sorter: "date", align: "center" },
        ],
        // autoColumns: true,
        movableColumns: true,      //allow column order to be changed

        rowClick: function (e, row) { //trigger an alert message when the row is clicked
            alert("Row " + row.getData().id + " Clicked!!!!");
        },
    };
    let opt2 = {
        data: tabledata,           //load row data from array
        layout: "fitColumns",      //fit columns to width of table
        responsiveLayout: "hide",  //hide columns that dont fit on the table
        tooltips: true,            //show tool tips on cells
        addRowPos: "top",          //when adding a new row, add it to the top of the table
        history: true,             //allow undo and redo actions on the table
        pagination: "local",       //paginate the data
        paginationSize: 7,         //allow 7 rows per page of data
        movableColumns: true,      //allow column order to be changed
        resizableRows: true,       //allow row order to be changed
        initialSort: [             //set the initial sort order of the data
            { column: "name", dir: "asc" },
        ],
        columns: [                 //define the table columns
            { title: "Name", field: "name", editor: "input" },
            { title: "Task Progress", field: "progress", align: "left", formatter: "progress", editor: true },
            { title: "Gender", field: "gender", width: 95, editor: "select", editorParams: { values: ["male", "female"] } },
            { title: "Rating", field: "rating", formatter: "star", align: "center", width: 100, editor: true },
            { title: "Color", field: "col", width: 130, editor: "input" },
            { title: "Date Of Birth", field: "dob", width: 130, sorter: "date", align: "center" },
            { title: "Driver", field: "car", width: 90, align: "center", formatter: "tickCross", sorter: "boolean", editor: true },
        ],
    };
    var table = new Tabulator("#example-table", opt1);
});