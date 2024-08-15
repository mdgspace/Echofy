"use client";
import Swal from "sweetalert2";
import { AlertAbnormalCloseProps, AlertBadRequestProps } from "../../interface/interface";

export default function alertBadRequest({reason, navigateToLogin}:AlertBadRequestProps) {
    try {
      Swal.fire({
        title: "Bad request",
        text: `Please try again ${reason}`,
        icon: "warning",
  
        iconColor: "#3670F5",
        confirmButtonColor: "#3670F5",
        confirmButtonText: "OK",
        didOpen: (popup: HTMLElement) => {
          popup.style.borderRadius = "1rem";
        },
      }).then((result) => {
        try {
          if (result.isConfirmed) navigateToLogin();
        } catch (error) {}
      });
    } catch (error) {}
  }