import './create_group.css'
import Cookies from "js-cookie";

import { AuthNavBar } from "../../components/auth_navbar";
import Sidebar from "../../components/sidebar";

import { useState, useEffect } from 'react';
import { get_user_data } from "~/services/user";
import { useNavigate } from 'react-router';


interface CreateGroupFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}


export function CreateGroup({ onSuccess, onCancel }: CreateGroupFormProps) {
    const domain_link = "http://localhost:8000/"
    const navigate = useNavigate();
    // Every page need this function.
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // loading user and prevent fail fetch
    const [userdata, setUserdata] = useState<any | null>(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    useEffect(() => {
        page_load();
    }, []);

    async function page_load() {
        setIsLoading(true);
        const { result, error } = await get_user_data();
        setUserdata(result);
        setError(error);
        setIsLoading(false);
    }

    const [formData, setFormData] = useState({
        owner: '',
        group_name: '',
        max_number: '',
    });
    const [bannerFile, setBannerFile] = useState<File | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
    };

    const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            setError('Invalid file type. Use JPG, PNG, GIF, or WEBP.');
            return;
        }
        
        // Validate file size (1.5MB max)
        if (file.size > 1.5 * 1024 * 1024) {
            setError('File too large. Maximum size is 1.5MB.');
            return;
        }

        setBannerFile(file);
        setError('');
        
        // Create preview
        const previewUrl = URL.createObjectURL(file);
        setBannerPreview(previewUrl);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
        // Create FormData object
        const formDataToSend = new FormData();
        
        // Append text fields
        formDataToSend.append('owner', userdata?.id || '');
        formDataToSend.append('group_name', formData.group_name);
        if (bannerFile) formDataToSend.append('banner_image', bannerFile);
        formDataToSend.append('max_member', formData.max_number);

        // Get auth token (adjust based on your auth setup)
        let token = Cookies.get("accessToken");

        // Send request
        const response = await fetch('http://localhost:8000/api/create_group', {
            method: 'POST',
            headers: {
             Authorization: "Bearer " + token , // or Token ${token} depending on your setup
            },
            body: formDataToSend, // Don't set Content-Type - browser will set it automatically with boundary
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create group');
        }

        const result = await response.json();
        console.log('Group created:', result);
        
        // Call success callback
        if (onSuccess) onSuccess();
        navigate('/group');
        } catch (err: any) {
        setError(err.message || 'An error occurred');
        console.error('Error creating group:', err);
        } finally {
        setIsSubmitting(false);
        }
    };

    // Cleanup preview URL
    useEffect(() => {
        return () => {
        if (bannerPreview) URL.revokeObjectURL(bannerPreview);
        };
    }, [bannerPreview]);
      

    // Returning Pages
    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }
    
    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
    <div className="page-container">
        <AuthNavBar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <div className="main-content">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <div className="content-area">
                <div className="create-group-form">
                    <h2>Create Group</h2>
                    
                    {error && (
                        <div className="error-message">{error}</div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* Group Name */}
                        <div className="form-group">
                            <label htmlFor="name">Group Name *</label>
                            <input
                                type="text"
                                id="name"
                                name="group_name"
                                value={formData.group_name}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter group name"
                            />
                        </div>

                        {/* Description */}
                        <div className="form-group">
                            <label htmlFor="max_number">Max-member</label>
                            <input
                            className="form-control"
                            type="number"
                            id="max_number"
                            name="max_number"
                            value={formData.max_number}
                            onChange={handleInputChange}
                            min = "0"
                            />
                        </div>

                        {/* Banner Image */}
                        <div className="form-group">
                        <label htmlFor="banner_image">Banner Image *</label>
                        <p className="field-description">
                            Max size: 1.5MB | Formats: JPG, PNG, GIF, WEBP | Recommended: 1500×430
                        </p>
                        
                        <input
                            type="file"
                            id="banner_image"
                            accept=".jpg,.jpeg,.png,.gif,.webp"
                            onChange={handleBannerUpload}
                            hidden
                            required
                        />
                        
                        {bannerPreview ? (
                            <div className="image-preview-container">
                            <img src={bannerPreview} alt="Banner preview" className="banner-preview" />
                            <button 
                                type="button" 
                                className="remove-preview-btn"
                                onClick={() => {
                                setBannerFile(null);
                                setBannerPreview(null);
                                }}
                            >
                                ×
                            </button>
                            </div>
                        ) : (
                            <label htmlFor="banner_image" className="upload-label">
                            <div className="upload-content">
                                <p className="upload-title">Upload Banner</p>
                                <p className="upload-subtitle">Click to select or drag & drop</p>
                            </div>
                            </label>
                        )}
                        </div>

                        {/* Actions */}
                        <div className="form-actions">
                        {onCancel && (
                            <button 
                            type="button" 
                            className="btn-cancel"
                            onClick={onCancel}
                            disabled={isSubmitting}
                            >
                            Cancel
                            </button>
                        )}
                        <button 
                            type="submit" 
                            className="btn-submit"
                            disabled={isSubmitting || !bannerFile}
                        >
                            {isSubmitting ? 'Creating...' : 'Create Group'}
                        </button>
                        </div>
                    </form>
                    </div>
            </div>
        </div>
    </div>
    )
}
