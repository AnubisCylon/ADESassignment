import React, { Fragment, useEffect, useState } from "react";

import EditFav from "./EditFav";

const Netflix = () => {

    const [fav_tab, delNetflix] = useState([]);

    // delete netflix function

    const netflix = async (id) => {
        try {
            const delNetflix = await fetch(`http://localhost:5000/delete/${id}`, {
                method: "DELETE"
            });

            delNetflix(fav_tab.filter(fav_tab => fav_tab.user_id !== id));
        } catch (err) {
            console.error(err.message);
        }
    };

    const getNetflix = async () => {
        try {
            const response = await fetch("http://localhost:5000/list");
            const jsonData = await response.json();

            delNetflix(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };


    useEffect(() => {
        getNetflix();
    }, []);

    return (
        <Fragment>
            {" "}
            <table class="table mt-5 text-center">
                <thead>

                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>

                </thead>
                <tbody>

                    {fav_tab.map(fav_tab => (
                        <tr key={fav_tab.user_id}>
                            <td>{fav_tab.Description}</td>
                            <td>
                                <EditFav fav_tab={fav_tab} />
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => delNetflix(fav_tab.user_id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))};

                </tbody>
            </table>
        </Fragment>
    );
};

export default Netflix;