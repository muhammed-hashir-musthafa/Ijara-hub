"use client";

import React from "react";
import { Input } from "@/components/base/ui/input";
import { UpdateUserPayload } from "@/types/auth";

interface ProfileEditFormProps {
  formData: UpdateUserPayload;
  setFormData: (data: UpdateUserPayload) => void;
}

const ProfileEditForm = ({ formData, setFormData }: ProfileEditFormProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name
          </label>
          <Input
            value={formData.fname || ""}
            onChange={(e) =>
              setFormData({ ...formData, fname: e.target.value })
            }
            placeholder="First Name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name
          </label>
          <Input
            value={formData.lname || ""}
            onChange={(e) =>
              setFormData({ ...formData, lname: e.target.value })
            }
            placeholder="Last Name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <Input
            value={formData.email || ""}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Email"
            type="email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone
          </label>
          <Input
            type="tel"
            value={formData.phone || ""}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder="Phone"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender
          </label>
          <select
            value={formData.gender || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                gender: e.target.value as "male" | "female" | "other",
              })
            }
            className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age
          </label>
          <Input
            type="number"
            value={formData.age?.toString() || ""}
            onChange={(e) => {
              const value = e.target.value;
              setFormData({
                ...formData,
                age: value ? parseInt(value) : 18,
              });
            }}
            placeholder="Age"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City
          </label>
          <Input
            value={formData.address?.city || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: {
                  ...formData.address,
                  city: e.target.value,
                },
              })
            }
            placeholder="City"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Emirate
          </label>
          <Input
            value={formData.address?.emirate || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: {
                  ...formData.address,
                  emirate: e.target.value,
                },
              })
            }
            placeholder="Emirate"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileEditForm;