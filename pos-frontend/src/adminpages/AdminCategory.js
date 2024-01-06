import React, { useEffect, useState } from 'react'
import AdminNavBar from './components/AdminNavBar'
import './Admin.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminCategory() {

    const [categories, setCategories] = useState(null);

    const [newCategory, setNewCategory] = useState(null);

    const [editCategoryId, setEditCategoryId] = useState(null);

    const handleEdit = (categoryId) => {
        setEditCategoryId(categoryId);
    };

    const handleConfirm = async (categoryId, updatedName) => {
        await updateCategoryName(categoryId, updatedName);
        setEditCategoryId(null);
    };

    const handleDelete = async (categoryId) => {
        try {
            await axios.delete(`http://localhost:8080/categories/${categoryId}`);
            const updatedCategories = categories.filter((category) => category.id !== categoryId);
            setCategories(updatedCategories);
        } catch (error) {
            if (error.response.status === 401) {
                navigate('/admin/login');
            }
        }
    };

    useEffect(() => {
        getCategories();
    }, [])

    const navigate = useNavigate();

    const createCategory = async () => {
        const data = {
            "name": newCategory,
        }

        try {
            const response = await axios.post("http://localhost:8080/categories", data);
            setNewCategory(response.data);
        } catch (error) {
            if (error.response.status === 401) {
                navigate("/admin/login");
            }
        }
    }

    const getCategories = async () => {
        try {
            const response = await axios.get("http://localhost:8080/categories");
            setCategories(response.data);
        } catch (error) {
            if (error.response.status === 401) {
                navigate("/admin/login");
            }
        }
    }

    const updateCategoryName = async (categoryId, updatedName) => {
        try {
            const response = await axios.put(`http://localhost:8080/categories/${categoryId}`, {
                name: updatedName,
            });
            const updatedCategories = categories.map((category) =>
                category.id === categoryId ? { ...category, name: updatedName } : category
            );
            setCategories(updatedCategories);
        } catch (error) {
            if (error.response.status === 401) {
                navigate('/admin/login');
            }
        }
    };

    return (
        <div>
            <AdminNavBar />
            <div className="admin-category-container">
                <form onSubmit={createCategory}>
                    <h2>Create a new Category</h2>
                    <label htmlFor="categoryName">Category Name:</label>
                    <input type="text" onChange={(e) => { setNewCategory(e.target.value) }} required />

                    <button type="submit">Create Category</button>
                </form>
            </div>

            {categories && categories.length > 0 && (
                <table className="category-table">
                    <colgroup>
                        <col style={{ width: '10%' }} />
                        <col style={{ width: '60%' }} />
                        <col style={{ width: '30%' }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th style={{textAlign:'center'}}>ID</th>
                            <th style={{textAlign:'center'}}>Name</th>
                            <th style={{textAlign:'center'}}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>
                                    {editCategoryId === category.id ? (
                                        <input
                                            className="edit-input"
                                            type="text"
                                            value={category.name}
                                            onChange={(e) => {
                                                const updatedName = e.target.value;
                                                updateCategoryName(category.id, updatedName);
                                            }}
                                        />
                                    ) : (
                                        category.name
                                    )}
                                </td>
                                <td>
                                    {editCategoryId === category.id ? (
                                        <button className="confirm-btn" onClick={() => handleConfirm(category.id, category.name)}>
                                            Confirm
                                        </button>
                                    ) : (
                                        <button className="update-btn" onClick={() => handleEdit(category.id)}>Update</button>
                                    )}
                                    <button className="delete-btn" onClick={() => handleDelete(category.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

        </div>
    )
}