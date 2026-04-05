"""Vínculo entre usuário Supabase Auth (UUID) e linha em public.pessoa."""


def get_or_create_pessoa_id(sb, user) -> int:
    uid = str(user.id)
    found = sb.table("pessoa").select("id").eq("auth_user_id", uid).limit(1).execute()
    if found.data:
        return int(found.data[0]["id"])

    email = getattr(user, "email", None) or ""
    nome = email.split("@")[0] if email else "Usuário"
    sb.table("pessoa").insert(
        {
            "auth_user_id": uid,
            "nome": nome,
        }
    ).execute()

    again = sb.table("pessoa").select("id").eq("auth_user_id", uid).limit(1).execute()
    if not again.data:
        raise RuntimeError("não foi possível criar ou localizar pessoa")
    return int(again.data[0]["id"])
