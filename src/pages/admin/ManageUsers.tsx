/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, User, ShieldCheck, UserX, ToggleLeft, ToggleRight } from 'lucide-react';

export default function ManageUsers() {
  const { users, currentUser, toggleUserRole, changeView } = useApp();
  
  const [search, setSearch] = useState('');

  // Search filter
  const filteredUsers = useMemo(() => {
    if (!search.trim()) return users;
    const q = search.toLowerCase().trim();
    return users.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
  }, [users, search]);

  const handleRoleToggle = (userId: string, name: string) => {
    if (currentUser && currentUser.id === userId) {
      alert('Security Warning: You cannot modify your own administrative role. Have another admin account revoke your credentials if required.');
      return;
    }

    if (confirm(`Safety Check: Are you sure you want to toggle the user role for "${name}"? This changes their dashboard and authorization scopes.`)) {
      toggleUserRole(userId);
    }
  };

  return (
    <div id="admin-users-view" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      {/* Title block */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-extrabold text-charcoal-900">Manage Registered Accounts</h1>
        <p className="text-xs text-charcoal-500 mt-1">Audit active client profiles, toggle administrator roles, and examine student registrations.</p>
      </div>

      {/* Admin navigation bar links */}
      <div className="flex border-b border-charcoal-200 pb-2 mb-8 gap-4 overflow-x-auto text-xs font-bold uppercase tracking-wider">
        <button onClick={() => changeView('admin-dashboard')} className="py-1.5 px-3 rounded-lg text-charcoal-500 hover:bg-charcoal-100 cursor-pointer">Overview Stats</button>
        <button onClick={() => changeView('admin-products')} className="py-1.5 px-3 rounded-lg text-charcoal-500 hover:bg-charcoal-100 cursor-pointer">Manage Products</button>
        <button onClick={() => changeView('admin-orders')} className="py-1.5 px-3 rounded-lg text-charcoal-500 hover:bg-charcoal-100 cursor-pointer">Manage Orders</button>
        <button onClick={() => changeView('admin-users')} className="py-1.5 px-3 rounded-lg bg-charcoal-900 text-white cursor-pointer">Manage Users ({users.length})</button>
      </div>

      {/* Search Filter input */}
      <div className="relative max-w-md mb-6">
        <input
          type="text"
          placeholder="Search user profiles by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-charcoal-200 bg-white py-2 pl-10 pr-4 text-xs outline-none focus:border-gold-400"
        />
        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal-400" />
      </div>

      {/* User Table grid list */}
      <div className="bg-white rounded-xl border border-charcoal-100 overflow-hidden shadow-3xs">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs text-charcoal-600">
            <thead className="bg-charcoal-50 text-3xs font-extrabold uppercase tracking-widest text-charcoal-400 border-b border-charcoal-100">
              <tr>
                <th className="py-4 px-6">User Profile</th>
                <th className="py-4 px-4">Contact Email</th>
                <th className="py-4 px-4">Created Date</th>
                <th className="py-4 px-4">Authorization Role</th>
                <th className="py-4 px-6 text-right">Toggle Authorization Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-100">
              {filteredUsers.map((u) => {
                const isAdmin = u.role === 'admin';
                return (
                  <tr key={u.id} className="hover:bg-charcoal-50/20">
                    <td className="py-4 px-6 flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gold-100 text-gold-800 flex items-center justify-center font-bold text-xs uppercase shrink-0">
                        {u.name.substring(0, 2)}
                      </div>
                      <div>
                        <span className="font-bold text-charcoal-900 block">{u.name}</span>
                        <span className="block text-[10px] text-charcoal-400 font-mono">{u.id}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-medium text-charcoal-800">{u.email}</td>
                    <td className="py-4 px-4 text-charcoal-500 font-medium">{u.createdAt}</td>
                    <td className="py-4 px-4">
                      {isAdmin ? (
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-gold-50 text-gold-800 border border-gold-200 text-2xs font-extrabold px-2 py-0.5 uppercase tracking-wider">
                          <ShieldCheck size={12} className="text-gold-500" /> Store Owner
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-charcoal-50 text-charcoal-700 border border-charcoal-200 text-2xs font-bold px-2 py-0.5 uppercase tracking-wider">
                          <User size={12} className="text-charcoal-400" /> Normal Customer
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleRoleToggle(u.id, u.name)}
                        className="inline-flex items-center gap-1.5 text-2xs font-bold uppercase tracking-wide cursor-pointer transition-colors"
                        style={{ color: isAdmin ? '#b28a51' : '#111827' }}
                      >
                        {isAdmin ? (
                          <>
                            <ToggleRight size={24} className="text-gold-500 hover:text-gold-600" /> Revoke Admin
                          </>
                        ) : (
                          <>
                            <ToggleLeft size={24} className="text-charcoal-300 hover:text-gold-400" /> Grant Admin
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-xs text-charcoal-500 italic bg-charcoal-50/10">No users profiles match search details.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
