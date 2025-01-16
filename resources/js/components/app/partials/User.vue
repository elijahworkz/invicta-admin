<template>
    <div class="user flex items-center">
        <span class="avatar">
            {{ userInitials }}
        </span>
        <div class="font-bold mr-2 leading-0">
            {{ user.name }}
        </div>
    </div>
</template>

<script setup>
const user = Invicta.user;

const userInitials = computed(() => {
    let initials = user.name || "";
    const nameSplit = initials.split(" ");

    if (nameSplit.length == 1) {
        initials = nameSplit[0] ? nameSplit[0].charAt(0) : "?";
    } else {
        initials = nameSplit[0].charAt(0) + nameSplit[1].charAt(0);
    }
    return initials;
});

const userAvatar = computed(() => {
    let avatar = "var(--el-color-primary-dark-2)";
    if ("avatar" in user.data && user.data.avatar) {
        let src = "src" in user.data.avatar ? user.data.avatar.src : "";
        avatar = `url(${user.data.avatar.src})`;
    }
    return avatar;
});

const textColor = computed(() => {
    return "avatar" in user.data && user.data.avatar ? "transparent" : "#fff";
});
</script>

<style lang="scss">
.user {
    gap: 10px;

    .avatar {
        background: v-bind("userAvatar") no-repeat center;
        background-size: cover;
        border-radius: 50%;
        color: v-bind("textColor");
        line-height: 30px;
        width: 30px;
        text-align: center;
        font-size: 12px;
        font-weight: 600;

        img {
            max-width: 100%;
        }
    }
}
</style>
