"use client";
import Swal from "sweetalert2";
import { AlertBannedUserProps } from "../../interface/interface";

const alertBannedUser = async function alertBannedUser({reason,navigateToLogin}:AlertBannedUserProps) {
    try {
      Swal.fire({
        title: "You have been banned",
        text: `${reason}`,
        icon: "error",
  
        confirmButtonColor: "#3670F5",
        iconColor: "#3670F5",
        confirmButtonText: "OK",
        didOpen: (popup: HTMLElement) => {
          popup.style.borderRadius = "1rem";
        },
        customClass: {
          confirmButton: "border-none",
        },
      }).then((result) => {
        try {
          if (result.isConfirmed) navigateToLogin();
        } catch (error) {}
      });
    } catch (error) {}
  }

export default alertBannedUser;