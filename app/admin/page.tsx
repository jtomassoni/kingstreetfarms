'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Section {
  id: number;
  name: string;
  sort_order: number;
  is_active: boolean;
}

interface ProductImage {
  src: string;
  alt: string;
}

interface Product {
  id: number;
  section_id: number;
  section_name?: string;
  name: string;
  description: string;
  price: number;
  depositPrice?: number;
  deliveryPrice?: number;
  deposit_price?: number;
  delivery_price?: number;
  depositUrl?: string;
  stripe_url?: string;
  is_retail: boolean;
  is_featured: boolean;
  is_active: boolean;
  images: ProductImage[];
  features: string[];
  dimensions: string;
  delivery: string;
  category?: string;
}

type Tab = 'sections' | 'products';

const API = '/api/cms';

function getFetchOpts(method: string, body?: unknown): RequestInit {
  const opts: RequestInit = {
    method,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  };
  if (body !== undefined) opts.body = JSON.stringify(body);
  return opts;
}

function parseImages(text: string): { src: string; alt: string }[] {
  return text
    .trim()
    .split('\n')
    .filter((l) => l.trim())
    .map((l) => {
      const comma = l.indexOf(',');
      if (comma > 0) return { src: l.slice(0, comma).trim(), alt: l.slice(comma + 1).trim() };
      return { src: l.trim(), alt: '' };
    });
}

function parseFeatures(text: string): string[] {
  return text
    .trim()
    .split('\n')
    .map((f) => f.trim())
    .filter(Boolean);
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('sections');
  const [sections, setSections] = useState<Section[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [hasSeeded, setHasSeeded] = useState(true);
  const [showSectionForm, setShowSectionForm] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState<{ message: string; type?: 'error' } | null>(null);

  const [sectionForm, setSectionForm] = useState({ name: '', is_active: true });
  const [productForm, setProductForm] = useState({
    name: '',
    section_id: 0,
    price: 0,
    deposit_price: 0,
    delivery_price: 0,
    stripe_url: '',
    description: '',
    dimensions: '',
    delivery: '',
    imagesText: '',
    featuresText: '',
    is_retail: false,
    is_featured: false,
    is_active: true,
  });

  const showToast = useCallback((message: string, type?: 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [sRes, pRes] = await Promise.all([
        fetch(`${API}/sections`, { credentials: 'include' }),
        fetch(`${API}/products`, { credentials: 'include' }),
      ]);
      const s = sRes.ok ? await sRes.json() : [];
      const p = pRes.ok ? await pRes.json() : [];
      setSections(s);
      setProducts(p);
      setHasSeeded(s.length > 0 || p.length > 0);
    } catch {
      showToast('Failed to load', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    async function checkAuth() {
      const res = await fetch(`${API}/me`, { credentials: 'include' });
      if (res.status === 401) {
        router.replace('/admin/login');
        return;
      }
      await load();
    }
    checkAuth();
  }, [router, load]);

  async function handleLogout() {
    await fetch(`${API}/logout`, { method: 'POST', credentials: 'include' });
    router.push('/admin/login');
    router.refresh();
  }

  async function runSeed() {
    setSeeding(true);
    try {
      const res = await fetch(`${API}/seed`, { method: 'POST', credentials: 'include' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Seed failed');
      showToast('Database seeded');
      await load();
    } catch (e) {
      showToast((e as Error).message || 'Seed failed', 'error');
    } finally {
      setSeeding(false);
    }
  }

  function openSectionForm(s?: Section) {
    setEditingSection(s ?? null);
    setSectionForm({ name: s?.name ?? '', is_active: s?.is_active ?? true });
    setShowSectionForm(true);
  }

  async function saveSection(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (editingSection) {
        const res = await fetch(`${API}/sections`, getFetchOpts('PATCH', { id: editingSection.id, name: sectionForm.name, is_active: sectionForm.is_active }));
        const out = await res.json();
        if (!res.ok) throw new Error(out.error || 'Failed to update section');
        showToast('Section updated');
      } else {
        const res = await fetch(`${API}/sections`, getFetchOpts('POST', { name: sectionForm.name, is_active: sectionForm.is_active }));
        const out = await res.json();
        if (!res.ok) throw new Error(out.error || 'Failed to create section');
        showToast('Section created');
      }
      setShowSectionForm(false);
      await load();
    } catch (e) {
      showToast((e as Error).message, 'error');
    }
  }

  async function toggleSectionActive(s: Section) {
    try {
      const res = await fetch(`${API}/sections`, getFetchOpts('PATCH', { id: s.id, is_active: !s.is_active }));
      const out = await res.json();
      if (!res.ok) throw new Error(out.error || 'Failed to update section');
      showToast('Section updated');
      await load();
    } catch (e) {
      showToast((e as Error).message, 'error');
    }
  }

  async function handleDeleteSection(s: Section) {
    if (!confirm(`Delete section "${s.name}"? Products in this section will also be deleted.`)) return;
    try {
      const res = await fetch(`${API}/sections?id=${s.id}`, { method: 'DELETE', credentials: 'include' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete section');
      showToast('Section deleted');
      await load();
    } catch (e) {
      showToast((e as Error).message, 'error');
    }
  }

  function openProductForm(p?: Product) {
    setEditingProduct(p ?? null);
    const secId = p?.section_id ?? sections[0]?.id ?? 0;
    const stripeUrl = p?.depositUrl ?? p?.stripe_url ?? '';
    const dep = p?.depositPrice ?? p?.deposit_price ?? 0;
    const del = p?.deliveryPrice ?? p?.delivery_price ?? 0;
    setProductForm({
      name: p?.name ?? '',
      section_id: secId,
      price: p?.price ?? 0,
      deposit_price: dep,
      delivery_price: del,
      stripe_url: stripeUrl,
      description: p?.description ?? '',
      dimensions: p?.dimensions ?? '',
      delivery: p?.delivery ?? '',
      imagesText: (p?.images ?? []).map((i) => `${i.src}, ${i.alt}`).join('\n'),
      featuresText: (p?.features ?? []).join('\n'),
      is_retail: p?.is_retail ?? false,
      is_featured: p?.is_featured ?? false,
      is_active: p?.is_active ?? true,
    });
    setShowProductForm(true);
  }

  async function saveProduct(e: React.FormEvent) {
    e.preventDefault();
    try {
      const payload = {
        section_id: productForm.section_id,
        name: productForm.name,
        description: productForm.description,
        price: productForm.price,
        deposit_price: productForm.deposit_price,
        delivery_price: productForm.delivery_price,
        stripe_url: productForm.stripe_url,
        dimensions: productForm.dimensions,
        delivery: productForm.delivery,
        images: parseImages(productForm.imagesText),
        features: parseFeatures(productForm.featuresText),
        is_retail: productForm.is_retail,
        is_featured: productForm.is_featured,
        is_active: productForm.is_active,
      };
      if (editingProduct) {
        const res = await fetch(`${API}/products`, getFetchOpts('PATCH', { id: editingProduct.id, ...payload }));
        const out = await res.json();
        if (!res.ok) throw new Error(out.error || 'Failed to update product');
        showToast('Product updated');
      } else {
        const res = await fetch(`${API}/products`, getFetchOpts('POST', payload));
        const out = await res.json();
        if (!res.ok) throw new Error(out.error || 'Failed to create product');
        showToast('Product created');
      }
      setShowProductForm(false);
      await load();
    } catch (e) {
      showToast((e as Error).message, 'error');
    }
  }

  async function toggleProductActive(p: Product) {
    try {
      const res = await fetch(`${API}/products`, getFetchOpts('PATCH', { id: p.id, is_active: !p.is_active }));
      const out = await res.json();
      if (!res.ok) throw new Error(out.error || 'Failed to update product');
      showToast('Product updated');
      await load();
    } catch (e) {
      showToast((e as Error).message, 'error');
    }
  }

  async function toggleProductFeatured(p: Product) {
    try {
      const res = await fetch(`${API}/products`, getFetchOpts('PATCH', { id: p.id, is_featured: !p.is_featured }));
      const out = await res.json();
      if (!res.ok) throw new Error(out.error || 'Failed to update product');
      showToast('Product updated');
      await load();
    } catch (e) {
      showToast((e as Error).message, 'error');
    }
  }

  async function handleDeleteProduct(p: Product) {
    if (!confirm(`Delete product "${p.name}"?`)) return;
    try {
      const res = await fetch(`${API}/products?id=${p.id}`, { method: 'DELETE', credentials: 'include' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete product');
      showToast('Product deleted');
      await load();
    } catch (e) {
      showToast((e as Error).message, 'error');
    }
  }

  return (
    <div className="min-h-screen bg-[var(--ksf-cream)]">
      {/* Admin header */}
      <header className="bg-[var(--ksf-green)] text-white px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold font-serif">Admin</h1>
        <div className="flex items-center gap-3">
          <Link href="/" className="text-sm text-white/90 hover:text-white">View site</Link>
          <button
            onClick={handleLogout}
            className="text-sm px-3 py-1.5 rounded bg-white/20 hover:bg-white/30"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6">
          <button
            className={`px-4 py-2 rounded-lg font-medium ${tab === 'sections' ? 'bg-[var(--ksf-green)] text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setTab('sections')}
          >
            Sections
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium ${tab === 'products' ? 'bg-[var(--ksf-green)] text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setTab('products')}
          >
            Products
          </button>
          {!hasSeeded && (
            <button
              className="px-4 py-2 rounded-lg font-medium bg-amber-500 text-white hover:bg-amber-600 disabled:opacity-50"
              onClick={runSeed}
              disabled={seeding}
            >
              {seeding ? 'Seeding...' : 'Seed initial data'}
            </button>
          )}
        </div>

        {/* Sections tab */}
        {tab === 'sections' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-[var(--ksf-dark)]">Product sections</h2>
              <button
                onClick={() => openSectionForm()}
                className="px-3 py-1.5 bg-[var(--ksf-green)] text-white rounded-lg text-sm font-medium hover:bg-[var(--ksf-brown)]"
              >
                Add section
              </button>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Name</th>
                    <th className="px-4 py-2 text-center text-sm font-medium text-gray-600">Active</th>
                    <th className="px-4 py-2 text-right text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sections.map((s) => (
                    <tr key={s.id} className="border-t border-gray-100 hover:bg-gray-50/50">
                      <td className="px-4 py-3 font-medium">{s.name}</td>
                      <td className="px-4 py-3 text-center">
                        <button
                          className={`w-10 h-6 rounded-full transition-colors block mx-auto ${s.is_active ? 'bg-[var(--ksf-green)]' : 'bg-gray-300'}`}
                          onClick={() => toggleSectionActive(s)}
                          title={s.is_active ? 'Active' : 'Inactive'}
                        >
                          <span className="sr-only">{s.is_active ? 'Active' : 'Inactive'}</span>
                          <span className={`block w-5 h-5 bg-white rounded-full transform transition-transform mt-0.5 ml-0.5 ${s.is_active ? 'translate-x-4' : 'translate-x-0'}`} />
                        </button>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button onClick={() => openSectionForm(s)} className="text-[var(--ksf-green)] hover:underline mr-2">Edit</button>
                        <button onClick={() => handleDeleteSection(s)} className="text-red-600 hover:underline">Delete</button>
                      </td>
                    </tr>
                  ))}
                  {!sections.length && (
                    <tr>
                      <td colSpan={3} className="px-4 py-8 text-center text-gray-500">
                        No sections yet. Click &quot;Seed initial data&quot; or add one.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Products tab */}
        {tab === 'products' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-[var(--ksf-dark)]">Products</h2>
              <button
                onClick={() => openProductForm()}
                className="px-3 py-1.5 bg-[var(--ksf-green)] text-white rounded-lg text-sm font-medium hover:bg-[var(--ksf-brown)]"
              >
                Add product
              </button>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium text-gray-600">Name</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600">Section</th>
                    <th className="px-4 py-2 text-right font-medium text-gray-600">Price</th>
                    <th className="px-4 py-2 text-center font-medium text-gray-600">Active</th>
                    <th className="px-4 py-2 text-center font-medium text-gray-600">Featured</th>
                    <th className="px-4 py-2 text-right font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-t border-gray-100 hover:bg-gray-50/50">
                      <td className="px-4 py-3 font-medium">{p.name}</td>
                      <td className="px-4 py-3">{p.section_name || p.category}</td>
                      <td className="px-4 py-3 text-right">${p.price}</td>
                      <td className="px-4 py-3 text-center">
                        <button
                          className={`w-10 h-6 rounded-full transition-colors inline-block ${p.is_active ? 'bg-[var(--ksf-green)]' : 'bg-gray-300'}`}
                          onClick={() => toggleProductActive(p)}
                        >
                          <span className={`block w-5 h-5 bg-white rounded-full transform transition-transform mt-0.5 ml-0.5 ${p.is_active ? 'translate-x-4' : 'translate-x-0'}`} />
                        </button>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          className={`w-10 h-6 rounded-full transition-colors inline-block ${p.is_featured ? 'bg-[var(--ksf-green)]' : 'bg-gray-300'}`}
                          onClick={() => toggleProductFeatured(p)}
                        >
                          <span className={`block w-5 h-5 bg-white rounded-full transform transition-transform mt-0.5 ml-0.5 ${p.is_featured ? 'translate-x-4' : 'translate-x-0'}`} />
                        </button>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button onClick={() => openProductForm(p)} className="text-[var(--ksf-green)] hover:underline mr-2">Edit</button>
                        <button onClick={() => handleDeleteProduct(p)} className="text-red-600 hover:underline">Delete</button>
                      </td>
                    </tr>
                  ))}
                  {!products.length && (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                        No products. Click &quot;Seed initial data&quot; or add one.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Section form modal */}
      {showSectionForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowSectionForm(false)}>
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-4">{editingSection ? 'Edit section' : 'New section'}</h3>
            <form onSubmit={saveSection}>
              <div className="mb-4">
                <label htmlFor="sec-name" className="block text-sm font-medium mb-1">Name</label>
                <input id="sec-name" type="text" value={sectionForm.name} onChange={(e) => setSectionForm((f) => ({ ...f, name: e.target.value }))} required className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div className="flex items-center gap-2 mb-4">
                <input id="sec-active" type="checkbox" checked={sectionForm.is_active} onChange={(e) => setSectionForm((f) => ({ ...f, is_active: e.target.checked }))} />
                <label htmlFor="sec-active">Active (visible on site)</label>
              </div>
              <div className="flex gap-2">
                <button type="submit" className="px-4 py-2 bg-[var(--ksf-green)] text-white rounded-lg font-medium">Save</button>
                <button type="button" onClick={() => setShowSectionForm(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product form modal */}
      {showProductForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 bg-black/50" onClick={() => setShowProductForm(false)}>
          <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-lg font-bold mb-4">{editingProduct ? 'Edit product' : 'New product'}</h3>
              <form onSubmit={saveProduct} className="space-y-4">
                <div>
                  <label htmlFor="prod-name" className="block text-sm font-medium mb-1">Name *</label>
                  <input id="prod-name" type="text" value={productForm.name} onChange={(e) => setProductForm((f) => ({ ...f, name: e.target.value }))} required className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label htmlFor="prod-section" className="block text-sm font-medium mb-1">Section *</label>
                  <select id="prod-section" value={productForm.section_id} onChange={(e) => setProductForm((f) => ({ ...f, section_id: Number(e.target.value) }))} required className="w-full px-3 py-2 border rounded-lg">
                    <option value="">Select...</option>
                    {sections.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="prod-price" className="block text-sm font-medium mb-1">Price ($)</label>
                    <input id="prod-price" type="number" step="0.01" min="0" value={productForm.price} onChange={(e) => setProductForm((f) => ({ ...f, price: Number(e.target.value) || 0 }))} className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label htmlFor="prod-deposit" className="block text-sm font-medium mb-1">Deposit ($)</label>
                    <input id="prod-deposit" type="number" step="0.01" min="0" value={productForm.deposit_price} onChange={(e) => setProductForm((f) => ({ ...f, deposit_price: Number(e.target.value) || 0 }))} className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label htmlFor="prod-delivery" className="block text-sm font-medium mb-1">Delivery ($)</label>
                    <input id="prod-delivery" type="number" step="0.01" min="0" value={productForm.delivery_price} onChange={(e) => setProductForm((f) => ({ ...f, delivery_price: Number(e.target.value) || 0 }))} className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                </div>
                <div>
                  <label htmlFor="prod-stripe" className="block text-sm font-medium mb-1">Stripe Payment Link URL *</label>
                  <input id="prod-stripe" type="url" value={productForm.stripe_url} onChange={(e) => setProductForm((f) => ({ ...f, stripe_url: e.target.value }))} required placeholder="https://buy.stripe.com/..." className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
                </div>
                <div>
                  <label htmlFor="prod-desc" className="block text-sm font-medium mb-1">Description</label>
                  <textarea id="prod-desc" rows={3} value={productForm.description} onChange={(e) => setProductForm((f) => ({ ...f, description: e.target.value }))} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label htmlFor="prod-dims" className="block text-sm font-medium mb-1">Dimensions</label>
                  <input id="prod-dims" type="text" value={productForm.dimensions} onChange={(e) => setProductForm((f) => ({ ...f, dimensions: e.target.value }))} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label htmlFor="prod-delivery-info" className="block text-sm font-medium mb-1">Delivery info</label>
                  <input id="prod-delivery-info" type="text" value={productForm.delivery} onChange={(e) => setProductForm((f) => ({ ...f, delivery: e.target.value }))} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label htmlFor="prod-images" className="block text-sm font-medium mb-1">Images (URL, alt) – one per line</label>
                  <textarea id="prod-images" rows={4} value={productForm.imagesText} onChange={(e) => setProductForm((f) => ({ ...f, imagesText: e.target.value }))} placeholder="/wine-rack.jpg, Handcrafted wine rack" className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
                </div>
                <div>
                  <label htmlFor="prod-features" className="block text-sm font-medium mb-1">Features – one per line</label>
                  <textarea id="prod-features" rows={3} value={productForm.featuresText} onChange={(e) => setProductForm((f) => ({ ...f, featuresText: e.target.value }))} placeholder="Holds 12 bottles&#10;Made from pine" className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={productForm.is_retail} onChange={(e) => setProductForm((f) => ({ ...f, is_retail: e.target.checked }))} />
                    <span>Retail (full price)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={productForm.is_featured} onChange={(e) => setProductForm((f) => ({ ...f, is_featured: e.target.checked }))} />
                    <span>Featured</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={productForm.is_active} onChange={(e) => setProductForm((f) => ({ ...f, is_active: e.target.checked }))} />
                    <span>Active</span>
                  </label>
                </div>
                <div className="flex gap-2 pt-2">
                  <button type="submit" className="px-4 py-2 bg-[var(--ksf-green)] text-white rounded-lg font-medium">Save</button>
                  <button type="button" onClick={() => setShowProductForm(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 ${toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-[var(--ksf-green)] text-white'}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}
