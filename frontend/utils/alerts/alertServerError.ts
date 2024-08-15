"use client";
import Swal from "sweetalert2";
import { AlertServerErrorProps } from "../../interface/interface";

export default function alertServerError({reason, navigateToLogin}:AlertServerErrorProps) {
    try {
      Swal.fire({
        title: "Server error",
        text: `Please try again ${reason}`,
        icon: "warning",
  
        iconColor: "#3670F5",
        confirmButtonColor: "#3670F5",
        confirmButtonText: "OK",
        didOpen: (popup:HTMLElement) => {
          popup.style.borderRadius = "1rem";
        },
      }).then((result) => {
        try {
          if (result.isConfirmed) navigateToLogin();
        } catch (error) {}
      });
    } catch (error) {}
  }