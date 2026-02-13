import React, { useState, useEffect, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../auth/authContext";
import toast from "react-hot-toast";
import RichTextEditor from "../components/RichTextEditor";

const Products = () => {
  const { adminToken } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [groupNames, setGroupNames] = useState([]);

  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [brochure, setBrochure] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [features, setFeatures] = useState("");
  const [usage, setUsage] = useState("");
  const [description, setDescription] = useState([{ heading: "", text: ""}, ]);

  const [callNumber, setCallNumber] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");

  // Files
  const [sliderImages, setSliderImages] = useState([]);
  const [youtubeLink, setYoutubeLink] = useState("");

  const [blueImages, setBlueImages] = useState([]);
  const [blueHeading, setBlueHeading] = useState("");

  // Specifications
  const [specifications, setSpecifications] = useState([{ key: "", value: "" }]);
// seo 
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");

// ===== UPDATE STATES =====
const [isEditing, setIsEditing] = useState(false);
const [editId, setEditId] = useState(null);

const [editName, setEditName] = useState("");
const [editImage, setEditImage] = useState(null);
const [editBrochure, setEditBrochure] = useState(null);
const [editPriceMin, setEditPriceMin] = useState("");
const [editPriceMax, setEditPriceMax] = useState("");
const [editFeatures, setEditFeatures] = useState("");
const [editUsage, setEditUsage] = useState("");
const [editDescription, setEditDescription] = useState([{ heading: "", text: ""}]);
const [editCallNumber, setEditCallNumber] = useState("");
const [editWhatsappNumber, setEditWhatsappNumber] = useState("");
const [editSliderImages, setEditSliderImages] = useState([]);
const [editBlueImages, setEditBlueImages] = useState([]);
const [editYoutubeLink, setEditYoutubeLink] = useState("");

const [editBlueHeading, setEditBlueHeading] = useState("");
const [editSpecifications, setEditSpecifications] = useState([{ key: "", value: ""}]);
// Edit Seo
  const [editMetaTitle, setEditMetaTitle] = useState("");
  const [editMetaDescription, setEditMetaDescription] = useState("");
  const [editCanonicalUrl, setEditCanonicalUrl] = useState("");


const addBlock = () => {
  setDescription([...description, { heading: "", text: "" }]);
};

const updateHeading = (index, value) => {
  const updated = [...description];
  updated[index].heading = value;
  setDescription(updated);
};

const updateText = (index, value) => {
  const updated = [...description];
  updated[index].text = value;
  setDescription(updated);
};

const removeBlock = (index) => {
  setDescription(description.filter((_, i) => i !== index));
};


/* ===== UPDATE DESCRIPTION HANDLERS ===== */

const addEditBlock = () => {
  setEditDescription((prev) => [
    ...(prev || []),
    { heading: "", text: "" },
  ]);
};

const updateEditHeading = (index, value) => {
  setEditDescription((prev) => {
    const updated = [...prev];
    updated[index] = { ...updated[index], heading: value };
    return updated;
  });
};

const updateEditText = (index, value) => {
  setEditDescription((prev) => {
    const updated = [...prev];
    updated[index] = { ...updated[index], text: value };
    return updated;
  });
};

const removeEditBlock = (index) => {
  setEditDescription((prev) =>
    prev.filter((_, i) => i !== index)
  );
};


/* SPECIFICATIONS HANDLERS */
const handleSpecChange = (index, field, value) => {
  setSpecifications((prevSpecs) =>
    prevSpecs.map((spec, i) =>
      i === index ? { ...spec, [field]: value } : spec
    )
  );
};

const addSpec = () => {
  setSpecifications((prevSpecs) => [...prevSpecs, { key: "", value: "" }]);
};

const removeSpec = (index) => {
  setSpecifications((prevSpecs) =>
    prevSpecs.filter((_, i) => i !== index)
  );
};

// edit spcifictions
const handleEditSpecChange = (index, field, value) => {
  setEditSpecifications((prevSpecs) =>
    prevSpecs.map((spec, i) =>
      i === index ? { ...spec, [field]: value } : spec
    )
  );
};

const addEditSpec = () => {
  setEditSpecifications((prevSpecs) => [
    ...prevSpecs,
    { key: "", value: "" },
  ]);
};

const removeEditSpec = (index) => {
  setEditSpecifications((prevSpecs) =>
    prevSpecs.filter((_, i) => i !== index)
  );
};


  /* ---------------- FETCH CATEGORIES ---------------- */
  const fetchCategories = async () => {
    try {
      const res = await axios.get("/categories", {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      setCategories(res.data.categories);
    } catch (err) {
      console.error("Category fetch error:", err);
    }
  };

  /* ---------------- FETCH SUBCATEGORIES ---------------- */
 const fetchProducts = async (catId) => {
  if (!catId) {
    setProducts([]);
    setGroupNames([]);
    return;
  }

  try {
    const res = await axios.get(
      `/products?category=${catId}`,
      {
        headers: { Authorization: `Bearer ${adminToken}` },
      }
    );

    const pros = Array.isArray(res.data.products)
      ? res.data.products
      : [];

    setProducts(pros);

    // 🔥 Safely extract unique group names
    const groups = [
      ...new Set(
        pros
          .map((s) => s.groupName)
          .filter((g) => typeof g === "string" && g.length > 0)
      ),
    ];

    setGroupNames(groups);
   


  } catch (err) {
    console.error("Product fetch error:", err);
    setProducts([]);
    setGroupNames([]);
  }
};

const fetchGroupNames = async () => {
  try {
    const res = await axios.get("/products/groups", {
      headers: { Authorization: `Bearer ${adminToken}` },
    });  

    if (Array.isArray(res.data)) {
      setGroupNames(res.data);
    }
  } catch (err) {
    console.error("Group fetch error:", err);
    setGroupNames([]);
  }
};

const handleAdd = async (e) => {
  e?.preventDefault();

  if (!name || !categoryId || !groupName) {
    return toast.error("Name, category & group required");
  }

  try {
    const formData = new FormData();

    // ===== REQUIRED =====
    formData.append("name", name.trim());
    formData.append("categoryId", categoryId);
    formData.append("groupName", groupName.trim());

    // ===== MEDIA =====
    if (image) formData.append("image", image);
    if (brochure) formData.append("brochure", brochure);

    // ===== PRICE =====
    if (priceMin || priceMax) {
      formData.append(
        "priceRange",
        JSON.stringify({ min: priceMin || 0, max: priceMax || 0 })
      );
    }

    // ===== ARRAYS =====
    if (features?.trim()) {
      formData.append(
        "features",
        JSON.stringify(features.split(",").map(f => f.trim()))
      );
    }

    if (usage?.trim()) {
      formData.append(
        "usage",
        JSON.stringify(usage.split(",").map(u => u.trim()))
      );
    }

    if (description?.length) {
      formData.append("description", JSON.stringify(description));
    }
// Seo

    formData.append("metaTitle", metaTitle);
    formData.append("metaDescription", metaDescription);  
    formData.append("canonicalUrl", canonicalUrl);

    // ===== CONTACT =====
    if (callNumber) formData.append("callNumber", callNumber);
    if (whatsappNumber) formData.append("whatsappNumber", whatsappNumber);

    // ===== SLIDER =====
    sliderImages?.forEach(img =>
      formData.append("sliderImages", img)
    );

    if (youtubeLink) formData.append("youtubeLink", youtubeLink);
   

    // ===== BLUE SECTION =====
    blueImages?.forEach(img =>
      formData.append("blueImages", img)
    );

    if (blueHeading) formData.append("blueHeading", blueHeading);

    // ===== SPECIFICATIONS =====
    const specs = {};
    specifications
      .filter(s => s.key && s.value)
      .forEach(s => (specs[s.key] = s.value));

    if (Object.keys(specs).length)
      formData.append("specifications", JSON.stringify(specs));

    const res = await axios.post("/products", formData, {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    });

    toast.success("Product added ✅");
    fetchProducts(categoryId);

  } catch (err) {
    toast.error(err.response?.data?.message || "Create failed ❌");
  }
};

const handleEditClick = (pro) => {
  setIsEditing(true);
  setEditId(pro._id);

  setEditName(pro.name || "");
  setEditPriceMin(pro.priceRange?.min || "");
  setEditPriceMax(pro.priceRange?.max || "");
  setEditFeatures(pro.features || "");
  setEditUsage(pro.usage || "");
  setEditDescription(pro.description || []);
  setEditMetaTitle(pro.metaTitle || "");
  setEditMetaDescription(pro.metaDescription || "");
  setEditCanonicalUrl(pro.canonicalUrl || "");
  setEditCallNumber(pro.callNumber || "");
  setEditWhatsappNumber(pro.whatsappNumber || "");
  setEditYoutubeLink(pro.slider?.youtube?.link || "");
  setEditBlueHeading(pro.blueSection?.heading || "");

 setEditSpecifications(
  pro?.specifications &&
  typeof pro.specifications === "object"
    ? Object.entries(pro.specifications).map(
        ([key, value]) => ({ key, value })
      )
    : [{ key: "", value: "" }]
);

  setEditSliderImages([]); // new uploads only
  setEditBlueImages([]);
};



const handleUpdate = async () => {
  try {
    setLoading(true);

    const formData = new FormData();

    formData.append("name", editName);
    formData.append(
      "priceRange",
      JSON.stringify({ min: editPriceMin, max: editPriceMax })
    );


   if (Array.isArray(editFeatures) && editFeatures.length > 0) {
  const cleanedFeatures = editFeatures
    .map(f => typeof f === "string" ? f.trim() : "")
    .filter(Boolean);

  if (cleanedFeatures.length > 0) {
    formData.append("features", JSON.stringify(cleanedFeatures));
  }
}

    formData.append("usage", editUsage);
    formData.append("description", JSON.stringify(editDescription));
    formData.append("metaTitle", editMetaTitle);
    formData.append("metaDescription", editMetaDescription);
    formData.append("canonicalUrl", editCanonicalUrl);

    formData.append("callNumber", editCallNumber);
    formData.append("whatsappNumber", editWhatsappNumber);
   
    formData.append("youtubeLink", editYoutubeLink);
 
    formData.append("blueHeading", editBlueHeading);

    const editSpecs = {};
      editSpecifications
        .filter(s => s.key && s.value)
        .forEach(s => (editSpecs[s.key] = s.value));

      if (Object.keys(editSpecs).length) {
        formData.append("specifications", JSON.stringify(editSpecs));
    }


    editSliderImages.forEach((img) =>
      formData.append("sliderImages", img)
    );

    editBlueImages.forEach((img) =>
      formData.append("blueImages", img)
    );

    if (editImage) formData.append("image", editImage);
    if (editBrochure) formData.append("brochure", editBrochure);

    await axios.put(`/products/${editId}`, formData, {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    });

    toast.success("Product updated");
    setIsEditing(false);
  } catch (err) {
    toast.error("Update failed");
  } finally {
    setLoading(false);
  }
};

  /* ---------------- DELETE SUBCATEGORY ---------------- */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to Delete this procategory?")) return;

    try {
      await axios.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });

      setProducts((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts(categoryId);
  }, [categoryId]);

  useEffect(() => {
  fetchGroupNames();
}, []);


  return (
    
    <div className="p-6">
       
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {isEditing && (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdate();
        }}
        className="space-y-4 border p-4 rounded bg-yellow-50"
      >
        <h2 className="text-lg font-bold">Update Product</h2>

        {/* GROUP NAME (READ ONLY or OPTIONAL) */}
        <input
          type="text"
          value={groupName}
          disabled
          className="border p-2 rounded w-full bg-gray-100"
        />

        {/* CATEGORY (READ ONLY) */}
        <select
          value={categoryId}
          disabled
          className="border p-2 rounded w-full bg-gray-100"
        >
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* SUBCATEGORY NAME */}
        <input
          type="text"
          placeholder="Product name"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          className="border p-2 rounded w-full"
        />

        {/* IMAGE */}
        <h4 className="font-semibold">Change Image (optional)</h4>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setEditImage(e.target.files[0])}
          className="border p-2 rounded w-full"
        />

        {/* PRICE */}
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min Price"
            value={editPriceMin}
            onChange={(e) => setEditPriceMin(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={editPriceMax}
            onChange={(e) => setEditPriceMax(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        {/* FEATURES */}
        <textarea
          rows={3}
          placeholder="Features (comma separated)"
          value={editFeatures}
          onChange={(e) => setEditFeatures(e.target.value)}
          className="border p-2 rounded w-full"
        />

        {/* USAGE */}
        <textarea
          rows={3}
          placeholder="Usage (comma separated)"
          value={editUsage}
          onChange={(e) => setEditUsage(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <h3 className="font-bold mt-6">SEO Settings</h3>

        <input
          type="text"
          placeholder="Meta Title"
          value={editMetaTitle}
          onChange={(e) => setEditMetaTitle(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        <textarea
          placeholder="Meta Description"
          value={editMetaDescription}
          onChange={(e) => setEditMetaDescription(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        <input
          type="text"
          placeholder="Canonical URL (Optional)"
          value={editCanonicalUrl}
          onChange={(e) => setEditCanonicalUrl(e.target.value)}
          className="border p-2 w-full"
        />

        {/* CONTACT */}
        <input
          type="tel"
          placeholder="Call Number"
          value={editCallNumber}
          onChange={(e) => setEditCallNumber(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <input
          type="tel"
          placeholder="WhatsApp Number"
          value={editWhatsappNumber}
          onChange={(e) => setEditWhatsappNumber(e.target.value)}
          className="border p-2 rounded w-full"
        />

        {/* BROCHURE */}
        <h4 className="font-semibold">Change Brochure (optional)</h4>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setEditBrochure(e.target.files[0])}
          className="border p-2 rounded w-full"
        />

        {/* DESCRIPTION BLOCKS */}
        <div className="border p-4 rounded bg-white">
          <h3 className="font-semibold mb-3">Product Description Sections</h3>

          {editDescription.map((block, index) => (
            <div key={index} className="border p-3 rounded mb-3">

              <input
                type="text"
                placeholder="Heading"
                value={block.heading}
                onChange={(e) =>
                  updateEditHeading(index, e.target.value)
                }
                className="border p-2 rounded w-full mb-2"
              />

              <RichTextEditor
                value={block.text}
                onChange={(html) =>
                  updateEditText(index, html)
                }
              />

              <button
                type="button"
                onClick={() => removeEditBlock(index)}
                className="text-red-600 text-sm mt-2"
              >
                Remove Section
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addEditBlock}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            + Add Section
          </button>
        </div>

    <h4 className="font-semibold mt-4">Specifications</h4>

      {editSpecifications.map((spec, idx) => (
        <div key={idx} className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Key"
            value={spec.key}
            onChange={(e) =>
              handleEditSpecChange(idx, "key", e.target.value)
            }
            className="border p-2 rounded flex-1"
          />

          <input
            type="text"
            placeholder="Value"
            value={spec.value}
            onChange={(e) =>
              handleEditSpecChange(idx, "value", e.target.value)
            }
            className="border p-2 rounded flex-1"
          />

          <button
            type="button"
            onClick={() => removeEditSpec(idx)}
            className="bg-red-500 text-white px-2 rounded"
          >
            ❌
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addEditSpec}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        + Add Spec
      </button>


      {/* SLIDER IMAGES */}
      <h4 className="font-semibold mt-4">Slider Images (max 5 allowed)</h4>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) =>
          setEditSliderImages([...e.target.files])
        }
        className="border p-2 rounded w-full"
      />

      {/* YOUTUBE */}
      <input
        type="text"
        placeholder="Youtube Video Link"
        value={editYoutubeLink}
        onChange={(e) =>
          setEditYoutubeLink(e.target.value)
        }
        className="border p-2 rounded w-full"
      />

  

      {/* BLUE SECTION */}
      <input
        type="text"
        placeholder="About The Product   (repeat the same or write new heading)"
        value={editBlueHeading}
        onChange={(e) =>
          setEditBlueHeading(e.target.value)
        }
        className="border p-2 rounded w-full"
      />
    <h4 className="font-semibold mt-2">About Product Images (max 5 allowed)</h4>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) =>
          setEditBlueImages([...e.target.files])
        }
        className="border p-2 rounded w-full"
      />

      {/* ACTIONS */}
      <div className="flex gap-3">
        <button
          type="promit"
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Update Product
        </button>

        <button
          type="button"
          onClick={() => setIsEditing(false)}
          className="bg-gray-500 text-white px-6 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  )}

  <form onSubmit={handleAdd} className="space-y-4 border p-4 rounded bg-white">
        <div className="grid grid-cols-1  gap-2">

            <select
              value={groupName || ""}
              onChange={(e) => setGroupName(e.target.value)}
              className="border p-2 rounded w-full"
            >
            <option value="">Select existing group</option>
            {groupNames.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Or type new group (eg: gas, dosa)"
            value={groupName || ""}
            onChange={(e) => setGroupName(e.target.value.toLowerCase())}
            className="border p-2 rounded w-full mt-2"
            required
          />

          {/* Category */}
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="border p-2 rounded w-full"
            >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

            {/* Product Name */}
          <input
            type="text"
            placeholder="Product name (eg: Gas5)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded"
          />
 
          <h4 className="font-semibold mt-4">Upload procategory image (max 1 allowed)</h4>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="border p-2 rounded w-full"
          />
         

          <input
            type="number"
            placeholder="Min Price"
            value={priceMin || ""}
            onChange={(e) => setPriceMin(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            type="number"
            placeholder="Max Price"
            value={priceMax || ""}
            onChange={(e) => setPriceMax(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        <textarea
          rows={3}
          placeholder="Features (comma separated)"
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <textarea
          rows={3}
          placeholder="Usage (comma separated)"
          value={usage}
          onChange={(e) => setUsage(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <h3 className="font-bold mt-6">SEO Settings</h3>

          <input
            type="text"
            placeholder="Meta Title"
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
            className="border p-2 w-full mb-3"
          />

          <textarea
            placeholder="Meta Description"
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            className="border p-2 w-full mb-3"
          />

          <input
            type="text"
            placeholder="Canonical URL (Optional)"
            value={canonicalUrl}
            onChange={(e) => setCanonicalUrl(e.target.value)}
            className="border p-2 w-full"
          />

         <input
          type="tel"
          placeholder="Call Number"
          value={callNumber}
          onChange={(e) => setCallNumber(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <input
          type="tel"
          placeholder="WhatsApp Number"
          value={whatsappNumber}
          onChange={(e) => setWhatsappNumber(e.target.value)}
          className="border p-2 rounded w-full"
        />

         <h4 className="font-semibold mt-4">Upload Brochure pdf (max 1 allowed)</h4>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setBrochure(e.target.files[0])}
            className="border p-2 rounded w-full"
          />


        <div className="border p-4 rounded bg-gray-50">
          <h3 className="font-semibold mb-3">Product Description Sections</h3>

            {description.map((block, index) => (
            <div key={index} className="border p-3 rounded mb-3">

                {/* HEADING */}
                <input
                  type="text"
                  placeholder="Heading"
                  value={block.heading}
                  onChange={(e) => updateHeading(index, e.target.value)}
                  className="border p-2 rounded w-full mb-2"
                />

                {/* RICH TEXT */}
                <RichTextEditor
                  value={block.text}
                  onChange={(html) => updateText(index, html)}
                />

                {/* REMOVE */}
                <button
                  type="button"
                  onClick={() => removeBlock(index)}
                  className="text-red-600 text-sm mt-2"
                >
                  Remove Block
                </button>

              </div>
            ))}
            <button
              type="button"
              onClick={addBlock}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              + Add Section
            </button>
        </div>


        {/* Optional Product-style fields */}
        <h4 className="font-semibold mt-4">Slider Images (max 5 allowed)</h4>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setSliderImages([...e.target.files])}
          className="border p-2 rounded w-full"
        />

        <h4 className="font-semibold mt-4">Youtube Video</h4>

        <input
          type="text"
          placeholder="Youtube Video Link"
          value={youtubeLink}
          onChange={(e) => setYoutubeLink(e.target.value)}
          className="border p-2 rounded w-full "
        />

     
          <input
          type="text"
          placeholder="About the Product (repeat this heading or add new one)"
          value={blueHeading}
          onChange={(e) => setBlueHeading(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <h4 className="font-semibold mt-2">About Product Images (max 5 allowed)</h4>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setBlueImages([...e.target.files])}
          className="border p-2 rounded w-full"
        />

      

        <h4 className="font-semibold mt-4">Specifications</h4>
        {specifications.map((spec, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Key"
              value={spec.key}
              onChange={(e) => handleSpecChange(idx, "key", e.target.value)}
              className="border p-2 rounded flex-1"
            />
            <input
              type="text"
              placeholder="Value"
              value={spec.value}
              onChange={(e) => handleSpecChange(idx, "value", e.target.value)}
              className="border p-2 rounded flex-1"
            />
            <button
              type="button"
              onClick={() => removeSpec(idx)}
              className="bg-red-500 text-white px-2 rounded"
            >
              ❌
            </button>
          </div>
        ))}

          <div className="flex items-center gap-4 mt-4">
            <button
              type="button"
              onClick={addSpec}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              + Add Spec
            </button>

            <button
              type="promit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Add Product
            </button>
          </div>  
      </form>



      {/* ===== SUBCATEGORY LIST ===== */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.length > 0 ? (
          products.map((pro) => (
            <div
              key={pro._id}
              className="border rounded-xl p-4 shadow-sm bg-white"
            >
              {pro.image && (
                <img
                  src={pro.image}
                  alt={pro.name}
                  className="w-full h-40 object-contain mb-3"
                />
              )}
              <h3 className="font-bold text-lg">{pro.name}</h3>
              {pro.priceRange?.min && pro.priceRange?.max && (
                <p className="text-blue-700 font-semibold">
                  ₹{pro.priceRange.min} – ₹{pro.priceRange.max}
                </p>
              )}
              <p>{pro.features?.join(", ")}</p>
              <p>{pro.usage?.join(", ")}</p>

                        
          <div className="flex gap-2 mt-3 flex-wrap">


            {pro.callNumber && (
              <a
                href={`tel:${pro.callNumber}`}
                className="flex-1 text-center bg-[rgb(0,52,102)] text-white py-2 rounded text-sm cursor-pointer"
              >
                  Call
              </a>
            )}


            {pro.whatsappNumber && (
              <a
                href={`https://wa.me/${pro.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center border border-green-600 text-green-600 py-2 rounded text-sm cursor-pointer"
              >
                  WhatsApp
              </a>
            )}


          {pro.brochureUrl && (
            <a
              href={pro.brochureUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center bg-blue-600 text-white py-2 rounded text-sm cursor-pointer"
            >
              Brochure
            </a>
          )}

          <button
          onClick={() => handleEditClick(pro)}
          className="flex-1 bg-yellow-500 text-white py-2 rounded text-sm"
        >
          Update
        </button>



          <button
            onClick={() => handleDelete(pro._id)}
            className="flex-1 bg-red-500 text-white py-2 rounded text-sm cursor-pointer"
          >
            Delete
          </button>

            </div>
          </div>


            ))

            
          ) : (
            <p className="col-span-full text-center">No products found</p>
          )}
        </div>

      </div>
    );
  };

export default Products;



