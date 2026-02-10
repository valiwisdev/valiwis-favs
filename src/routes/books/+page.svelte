<script lang="ts">
    import type { PageProps } from './$types';
    let {data}: PageProps = $props();
</script>

<h1>Books</h1>

{#if data.works.length > 0}
    <ul>
        {#each data.works as work}
            <li>{work.title}</li>
        {/each}
    </ul>
{:else}
    <p>No books found.</p>
{/if}