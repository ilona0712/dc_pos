import frappe
from frappe import _
from frappe.auth import LoginManager

@frappe.whitelist(allow_guest=True)
def pos_login_with_pin(pin):
    user = frappe.get_value("User PIN", {"pin": pin}, "user")
    if not user:
        frappe.throw(_("Invalid PIN"), frappe.exceptions.AuthenticationError)

    user_doc = frappe.get_doc("User", user)
    if not user_doc.enabled:
        frappe.throw(_("User {0} is disabled").format(user), frappe.exceptions.AuthenticationError)

    login_manager = LoginManager()
    login_manager.user = user
    login_manager.post_login()

    return {
        "message": _("Login Successful"),
        "user": user,
        "full_name": user_doc.get_formatted("full_name"),
        "sid": frappe.session.sid
    }
