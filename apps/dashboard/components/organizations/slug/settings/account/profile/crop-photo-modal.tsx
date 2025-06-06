'use client';

import * as React from 'react';
import NiceModal, { type NiceModalHocProps } from '@ebay/nice-modal-react';

import { Button } from '@workspace/ui/components/button';
import { Cropper, type CropperElement } from '@workspace/ui/components/cropper';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@workspace/ui/components/dialog';
import { Separator } from '@workspace/ui/components/separator';
import { toast } from '@workspace/ui/components/sonner';

import { useEnhancedModal } from '~/hooks/use-enhanced-modal';
import { MAX_IMAGE_SIZE } from '~/lib/file-upload';

export type CropPhotoModalProps = NiceModalHocProps & {
  file: File;
  aspectRatio?: number;
  circularCrop: boolean;
};

export const CropPhotoModal = NiceModal.create<CropPhotoModalProps>(
  ({ file, aspectRatio, circularCrop }) => {
    const modal = useEnhancedModal();
    const title = 'Crop photo';
    const description = 'Adjust the size of the grid to crop your image.';
    const cropperRef = React.useRef<CropperElement>(null);

    const handleApply = async () => {
      if (cropperRef.current) {
        const croppedImage = await cropperRef.current.getCroppedImage();
        if (croppedImage) {
          modal.resolve(croppedImage);
          modal.handleClose();
        } else {
          toast.error('Failed to crop the image.');
        }
      }
    };

    return (
      <Dialog open={modal.visible}>
        <DialogContent
          className="max-w-lg"
          onClose={modal.handleClose}
          onAnimationEndCapture={modal.handleAnimationEndCapture}
        >
          <div className="space-y-4">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <Separator />
            <Cropper
              ref={cropperRef}
              file={file}
              aspectRatio={aspectRatio}
              circularCrop={circularCrop}
              maxImageSize={MAX_IMAGE_SIZE}
            />
            <DialogFooter className="flex flex-col space-y-2 sm:flex-row sm:space-y-0">
              <Button
                type="button"
                variant="outline"
                onClick={modal.handleClose}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="default"
                onClick={handleApply}
              >
                Apply
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
);
