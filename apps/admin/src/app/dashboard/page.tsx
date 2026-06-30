'use client';

import React, { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 1240,
    totalProjects: 3120,
    totalBuilds: 890,
    mrr: 15400,
    activeBuildWorkers: 4,
    aiCreditsConsumed: 452000,
  });

  const [users, setUsers] = useState([
    { id: '1', name: 'John Doe', email: 'john@example.com', plan: 'PROFESSIONAL', status: 'ACTIVE', joined: '2026-06-01' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', plan: 'STARTER', status: 'ACTIVE', joined: '2026-06-15' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', plan: 'FREE', status: 'SUSPENDED', joined: '2026-06-20' },
  ]);

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>Universal Web to Native Admin Portal</h1>
        <p style={{ color: '#6b7280' }}>Global enterprise monitoring, metrics, and operations dashboard.</p>
      </header>

      {/* Grid of Stats Cards */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={cardStyle}>
          <h3 style={labelStyle}>Total Users</h3>
          <p style={valueStyle}>{stats.totalUsers}</p>
        </div>
        <div style={cardStyle}>
          <h3 style={labelStyle}>Total Projects</h3>
          <p style={valueStyle}>{stats.totalProjects}</p>
        </div>
        <div style={cardStyle}>
          <h3 style={labelStyle}>Total Native Builds</h3>
          <p style={valueStyle}>{stats.totalBuilds}</p>
        </div>
        <div style={cardStyle}>
          <h3 style={labelStyle}>Monthly Recurring Revenue (MRR)</h3>
          <p style={{ ...valueStyle, color: '#10b981' }}>${stats.mrr.toLocaleString()}</p>
        </div>
        <div style={cardStyle}>
          <h3 style={labelStyle}>AI Credits Consumed</h3>
          <p style={valueStyle}>{stats.aiCreditsConsumed.toLocaleString()}</p>
        </div>
        <div style={cardStyle}>
          <h3 style={labelStyle}>Active Build Workers</h3>
          <p style={{ ...valueStyle, color: '#3b82f6' }}>{stats.activeBuildWorkers} / 4 Online</p>
        </div>
      </section>

      {/* Main panels */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px' }}>
        {/* User Management Panel */}
        <section style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>User Management</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f3f4f6', color: '#6b7280' }}>
                <th style={{ padding: '12px' }}>Name</th>
                <th style={{ padding: '12px' }}>Email</th>
                <th style={{ padding: '12px' }}>Subscription Plan</th>
                <th style={{ padding: '12px' }}>Account Status</th>
                <th style={{ padding: '12px' }}>Joined Date</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '12px', fontWeight: '500' }}>{user.name}</td>
                  <td style={{ padding: '12px' }}>{user.email}</td>
                  <td style={{ padding: '12px' }}><span style={planBadge(user.plan)}>{user.plan}</span></td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ color: user.status === 'ACTIVE' ? '#10b981' : '#ef4444', fontWeight: '600' }}>
                      {user.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px', color: '#6b7280' }}>{user.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* System Health Panel */}
        <section style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>System Health & Orchestration</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div style={healthIndicator('API Gateway', 'Operational', '#10b981')} />
            <div style={healthIndicator('AI Analysis Engine', 'Operational', '#10b981')} />
            <div style={healthIndicator('Build Service Worker', 'Busy (2 tasks in queue)', '#f59e0b')} />
            <div style={healthIndicator('Database Catalog', 'Operational', '#10b981')} />
          </div>
        </section>
      </div>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  background: 'white',
  padding: '20px',
  borderRadius: '12px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  border: '1px solid #e5e7eb',
};

const labelStyle: React.CSSProperties = {
  color: '#6b7280',
  fontSize: '14px',
  fontWeight: '500',
  margin: '0 0 8px 0',
};

const valueStyle: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: 'bold',
  margin: 0,
};

function planBadge(plan: string): React.CSSProperties {
  const isPro = plan === 'PROFESSIONAL';
  return {
    padding: '4px 8px',
    borderRadius: '9999px',
    fontSize: '12px',
    fontWeight: 'bold',
    background: isPro ? '#e0f2fe' : '#f3f4f6',
    color: isPro ? '#0369a1' : '#374151',
  };
}

function healthIndicator(serviceName: string, status: string, color: string) {
  return (
    <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontWeight: '500' }}>{serviceName}</span>
      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: color, display: 'inline-block' }} />
        <span style={{ fontSize: '14px', color: '#4b5563' }}>{status}</span>
      </span>
    </div>
  );
}
