"use client";

import React, { useState } from "react";
import { Button } from "@/components/base/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/base/ui/dialog";
import { Edit } from "lucide-react";
import { Property } from "@/types/owner";
import EditPropertyForm from "@/components/owner/forms/EditPropertyForm";

interface EditPropertyModalProps {
  property: Property;
  onSave: (updatedProperty: Property) => void;
}

export default function EditPropertyModal({ property, onSave }: EditPropertyModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = (updatedProperty: Property) => {
    onSave(updatedProperty);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
        >
          <Edit className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
          Edit Property
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            Edit Property
          </DialogTitle>
        </DialogHeader>

        <EditPropertyForm 
          property={property} 
          onSave={handleSave} 
          onCancel={handleCancel} 
        />
      </DialogContent>
    </Dialog>
  );
}